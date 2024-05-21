#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("6p1a6Nq66DgLomDJWYSyqamaAyUe5FfQcdnhSXk41ieh");

#[program]
pub mod test01 {
    use super::*;

  pub fn close(_ctx: Context<CloseTest01>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.test01.count = ctx.accounts.test01.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.test01.count = ctx.accounts.test01.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeTest01>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.test01.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeTest01<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Test01::INIT_SPACE,
  payer = payer
  )]
  pub test01: Account<'info, Test01>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseTest01<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub test01: Account<'info, Test01>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub test01: Account<'info, Test01>,
}

#[account]
#[derive(InitSpace)]
pub struct Test01 {
  count: u8,
}
