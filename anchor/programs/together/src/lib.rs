use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, MintTo, TokenAccount, Transfer};
use solana_program::entrypoint::ProgramResult;

declare_id!("6X1bbuhSvquPbM3sByfnMNfT2MXUZX5BvFHSAJx4x1yN");

#[program]
pub mod token_voting {
    use super::*;

    // Initialize the token mint and mint initial tokens to the token account
    pub fn initialize_mint(ctx: Context<InitializeMint>, amount: u64) -> ProgramResult {
        let cpi_accounts = MintTo {
            mint: ctx.accounts.mint.to_account_info(),
            to: ctx.accounts.token_account.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);

        token::mint_to(cpi_ctx, amount)?;
        Ok(())
    }

    // Buy tokens by paying with SOL
    pub fn buy_tokens(ctx: Context<BuyTokens>, amount: u64) -> ProgramResult {
        let user_account = &ctx.accounts.user_authority;
        let vault_account = &ctx.accounts.vault;
        let token_mint = &ctx.accounts.mint;
        let user_token_account = &ctx.accounts.user_token_account;

        // Transfer SOL from user to vault
        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &user_account.key,
            &vault_account.key,
            amount,
        );
        anchor_lang::solana_program::program::invoke(
            &ix,
            &[
                user_account.to_account_info(),
                vault_account.to_account_info(),
            ],
        )?;

        // Mint tokens to user's token account
        let cpi_accounts = MintTo {
            mint: token_mint.to_account_info(),
            to: user_token_account.to_account_info(),
            authority: ctx.accounts.mint_authority.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);

        // Here we assume a 1:1 conversion rate for simplicity, adjust as needed
        token::mint_to(cpi_ctx, amount)?;

        Ok(())
    }

    // Vote by transferring a token to the vault and recording the vote
    pub fn vote(ctx: Context<Vote>, category_id: u8, trait_id: u8) -> ProgramResult {
        let cpi_accounts = Transfer {
            from: ctx.accounts.user_token_account.to_account_info(),
            to: ctx.accounts.vault_token_account.to_account_info(),
            authority: ctx.accounts.user_authority.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);

        token::transfer(cpi_ctx, 1)?;

        let vote_data = &mut ctx.accounts.vote_data;
        vote_data.category_id = category_id;
        vote_data.trait_id = trait_id;
        vote_data.vote_count += 1; 

        Ok(())
    }

    // Unlock tokens after the voting period ends
    pub fn unlock_tokens(ctx: Context<UnlockTokens>, amount: u64) -> ProgramResult {
        let cpi_accounts = Transfer {
            from: ctx.accounts.vault_token_account.to_account_info(),
            to: ctx.accounts.user_token_account.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);

        token::transfer(cpi_ctx, amount)?;
        Ok(())
    }

    // Read vote results
    pub fn read_vote_results(ctx: Context<ReadVoteResults>) -> ProgramResult {
        let vote_data = &ctx.accounts.vote_data;
        msg!("Category ID: {}, Trait ID: {}, Vote Count: {}", vote_data.category_id, vote_data.trait_id, vote_data.vote_count);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeMint<'info> {
    #[account(mut)]
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub token_account: Account<'info, TokenAccount>,
    pub authority: Signer<'info>,
    pub token_program: Program<'info, token::Token>,
}


#[derive(Accounts)]
pub struct BuyTokens<'info> {
    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub vault: AccountInfo<'info>,
    pub user_authority: Signer<'info>,
    #[account(signer)]
    pub mint_authority: AccountInfo<'info>,
    pub token_program: Program<'info, token::Token>,
    pub system_program: Program<'info, System>,
}


#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub vote_data: Account<'info, VoteData>,
    pub user_authority: Signer<'info>,
    pub token_program: Program<'info, token::Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UnlockTokens<'info> {
    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,
    pub authority: Signer<'info>,
    pub token_program: Program<'info, token::Token>,
}

#[derive(Accounts)]
pub struct ReadVoteResults<'info> {
    pub vote_data: Account<'info, VoteData>,
}

#[account]
pub struct VoteData {
    pub category_id: u8,
    pub trait_id: u8,
    pub vote_count: u64,
}