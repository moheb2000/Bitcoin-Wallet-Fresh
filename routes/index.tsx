/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import * as Key from "../modules/generate.ts";

interface Data {
  privateKey: string;
  publicKey: string;
  publicKeyHash: string;
  publicKeyAddress: string[];
}

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const privateKey = Key.createRandomPrivateKey();
    const publicKey = Key.createPublicKey(privateKey);
    const publicKeyHashJSON = await Key.createPublicKeyHash(privateKey);
    const publicKeyHash = publicKeyHashJSON.publicKeyHash;
    const publicAddressJSON = await Key.createPublicAddress(publicKeyHash);
    const publicKeyAddress = Object.values(publicAddressJSON);
    return ctx.render({
      privateKey,
      publicKey,
      publicKeyHash,
      publicKeyAddress,
    });
  },
};

export default function Home({ data }: PageProps<Data>) {
  const { privateKey, publicKey, publicKeyHash, publicKeyAddress } = data;
  return (
    <main>
      <div class="pure-g">
        <div class="pure-u-1 pure-u-md-1-4"></div>
        <div class="pure-u-1 pure-u-md-1-2">
          <h1>Bitcoin Wallet</h1>
          <p>This is my primary project</p>
          <h2>Introdunction</h2>
          <p>This is bitcoin wallet introdunction</p>
          <h2>Get Started</h2>
          <form class="pure-form">
            <fieldset>
              <button type="submit" class="pure-button pure-button-primary">
                Create Random
              </button>
            </fieldset>
          </form>
          <h3>Private Key</h3>
          <form action="#" class="pure-form  pure-form-stacked">
            <fieldset>
              <label for="private-key">Private Key</label>
              <input
                type="text"
                class="pure-input-1"
                id="private-key"
                placeholder="Private Key"
                value={privateKey}
              >
              </input>
              <button type="submit" class="pure-button pure-button-primary">
                Check
              </button>
            </fieldset>
          </form>
          <h3>Public Key</h3>
          <form action="#" class="pure-form  pure-form-stacked">
            <fieldset>
              <label for="public-key">Public Key</label>
              <input
                type="text"
                class="pure-input-1"
                id="public-key"
                placeholder="Public Key"
                value={publicKey}
              >
              </input>
              <button type="submit" class="pure-button pure-button-primary">
                Check
              </button>
            </fieldset>
          </form>
          <h3>Public Key Hash</h3>
          <form action="#" class="pure-form  pure-form-stacked">
            <fieldset>
              <label for="public-key-hash">Public Key Hash</label>
              <input
                type="text"
                class="pure-input-1"
                id="public-key-hash"
                placeholder="Public Key Hash"
                value={publicKeyHash}
              >
              </input>
              <button type="submit" class="pure-button pure-button-primary">
                Check
              </button>
            </fieldset>
          </form>
          <h3>Public Address</h3>
          <form action="#" class="pure-form  pure-form-stacked">
            <fieldset>
              <label for="step1">Step1</label>
              <input
                type="text"
                class="pure-input-1"
                id="step1"
                placeholder="Step1"
                readonly
                value={publicKeyAddress[0]}
              >
              </input>
              <label for="step2">Step2</label>
              <input
                type="text"
                class="pure-input-1"
                id="step2"
                placeholder="Step2"
                readonly
                value={publicKeyAddress[1]}
              >
              </input>
              <label for="step3">Step3</label>
              <input
                type="text"
                class="pure-input-1"
                id="step3"
                placeholder="Step3"
                readonly
                value={publicKeyAddress[2]}
              >
              </input>
              <label for="step4">Checksum</label>
              <input
                type="text"
                id="step4"
                placeholder="Checksum"
                readonly
                value={publicKeyAddress[3]}
              >
              </input>
              <label for="step5">Step5</label>
              <input
                type="text"
                class="pure-input-1"
                id="step5"
                placeholder="Step5"
                readonly
                value={publicKeyAddress[4]}
              >
              </input>
              <label for="step6">Public Address</label>
              <input
                type="text"
                class="pure-input-1"
                id="step6"
                placeholder="Public Adress"
                readonly
                value={publicKeyAddress[5]}
              >
              </input>
            </fieldset>
          </form>
        </div>
        <div class="pure-u-1 pure-u-md-1-4"></div>
      </div>
    </main>
  );
}
