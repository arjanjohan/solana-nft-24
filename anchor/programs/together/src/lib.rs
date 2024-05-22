use anchor_lang::prelude::*;

declare_id!("6X1bbuhSvquPbM3sByfnMNfT2MXUZX5BvFHSAJx4x1yN");

#[program]
pub mod together {
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