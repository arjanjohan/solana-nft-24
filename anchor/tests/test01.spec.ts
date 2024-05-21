import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import { Test01 } from '../target/types/test01';

describe('test01', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace.Test01 as Program<Test01>;

  const test01Keypair = Keypair.generate();

  it('Initialize Test01', async () => {
    await program.methods
      .initialize()
      .accounts({
        test01: test01Keypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([test01Keypair])
      .rpc();

    const currentCount = await program.account.test01.fetch(
      test01Keypair.publicKey
    );

    expect(currentCount.count).toEqual(0);
  });

  it('Increment Test01', async () => {
    await program.methods
      .increment()
      .accounts({ test01: test01Keypair.publicKey })
      .rpc();

    const currentCount = await program.account.test01.fetch(
      test01Keypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Increment Test01 Again', async () => {
    await program.methods
      .increment()
      .accounts({ test01: test01Keypair.publicKey })
      .rpc();

    const currentCount = await program.account.test01.fetch(
      test01Keypair.publicKey
    );

    expect(currentCount.count).toEqual(2);
  });

  it('Decrement Test01', async () => {
    await program.methods
      .decrement()
      .accounts({ test01: test01Keypair.publicKey })
      .rpc();

    const currentCount = await program.account.test01.fetch(
      test01Keypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Set test01 value', async () => {
    await program.methods
      .set(42)
      .accounts({ test01: test01Keypair.publicKey })
      .rpc();

    const currentCount = await program.account.test01.fetch(
      test01Keypair.publicKey
    );

    expect(currentCount.count).toEqual(42);
  });

  it('Set close the test01 account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        test01: test01Keypair.publicKey,
      })
      .rpc();

    // The account should no longer exist, returning null.
    const userAccount = await program.account.test01.fetchNullable(
      test01Keypair.publicKey
    );
    expect(userAccount).toBeNull();
  });
});
