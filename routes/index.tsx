/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { qrcode } from "https://deno.land/x/qrcode@v2.0.0/mod.ts";
import * as Key from "../modules/generate.ts";

interface Data {
  privateKey: string;
  publicKey: string;
  publicKeyHash: string;
  publicKeyAddress: string[];
  base64image: string;
}

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    let privateKey = url.searchParams.get("sk") || Key.createRandomPrivateKey();
    let publicKey = url.searchParams.get("pk") ||
      Key.createPublicKey(privateKey);
    if (url.searchParams.get("pk")) privateKey = "";
    const publicKeyHashJSON = await Key.createPublicKeyHash(publicKey);
    const publicKeyHash = url.searchParams.get("pkh") ||
      publicKeyHashJSON.publicKeyHash;
    if (url.searchParams.get("pkh")) privateKey = "", publicKey = "";
    const publicAddressJSON = await Key.createPublicAddress(publicKeyHash);
    const publicKeyAddress = Object.values(publicAddressJSON);
    const base64image = String(await qrcode(publicKeyAddress[5]));
    return ctx.render({
      privateKey,
      publicKey,
      publicKeyHash,
      publicKeyAddress,
      base64image,
    });
  },
};

export default function Home({ data }: PageProps<Data>) {
  const {
    privateKey,
    publicKey,
    publicKeyHash,
    publicKeyAddress,
    base64image,
  } = data;

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
          <form action="/" class="pure-form">
            <fieldset>
              <button type="submit" class="pure-button pure-button-primary">
                Create Random
              </button>
            </fieldset>
          </form>
          <h3 id="sk">Private Key</h3>
          <form action="#sk" class="pure-form  pure-form-stacked">
            <fieldset>
              <label for="private-key">Private Key</label>
              <input
                type="text"
                class="pure-input-1"
                id="private-key"
                name="sk"
                placeholder="Private Key"
                value={privateKey}
                required
              />
              <button type="submit" class="pure-button pure-button-primary">
                Check
              </button>
            </fieldset>
          </form>
          <h3 id="pk">Public Key</h3>
          <form action="#pk" class="pure-form  pure-form-stacked">
            <fieldset>
              <label for="public-key">Public Key</label>
              <input
                type="text"
                class="pure-input-1"
                id="public-key"
                name="pk"
                placeholder="Public Key"
                value={publicKey}
                required
              />
              <button type="submit" class="pure-button pure-button-primary">
                Check
              </button>
            </fieldset>
          </form>
          <h3 id="pkh">Public Key Hash</h3>
          <form action="#pkh" class="pure-form  pure-form-stacked">
            <fieldset>
              <label for="public-key-hash">Public Key Hash</label>
              <input
                type="text"
                class="pure-input-1"
                id="public-key-hash"
                name="pkh"
                placeholder="Public Key Hash"
                value={publicKeyHash}
                required
              />
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
              />
              <label for="step2">Step2</label>
              <input
                type="text"
                class="pure-input-1"
                id="step2"
                placeholder="Step2"
                readonly
                value={publicKeyAddress[1]}
              />
              <label for="step3">Step3</label>
              <input
                type="text"
                class="pure-input-1"
                id="step3"
                placeholder="Step3"
                readonly
                value={publicKeyAddress[2]}
              />
              <label for="step4">Checksum</label>
              <input
                type="text"
                id="step4"
                placeholder="Checksum"
                readonly
                value={publicKeyAddress[3]}
              />
              <label for="step5">Step5</label>
              <input
                type="text"
                class="pure-input-1"
                id="step5"
                placeholder="Step5"
                readonly
                value={publicKeyAddress[4]}
              />
              <label for="step6">Public Address</label>
              <input
                type="text"
                class="pure-input-1"
                id="step6"
                placeholder="Public Adress"
                readonly
                value={publicKeyAddress[5]}
              />
            </fieldset>
          </form>
        </div>
        <div class="pure-u-1 pure-u-md-1-4 qrcode-column">
          <div class="qrcode-card">
            <img class="pure-img" src={base64image} alt="qrcode" />
            <form action="#" class="pure-form  pure-form-stacked">
              <fieldset>
                <label for="adrs">Public Address</label>
                <input
                  type="text"
                  class="pure-input-1"
                  id="adrs"
                  placeholder="Public Adress"
                  readonly
                  value={publicKeyAddress[5]}
                />
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
