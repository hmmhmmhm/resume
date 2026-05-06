// ----- Types -----
export type EdgeCryptoModule = typeof import("edge-crypto");

export type StatusState = {
  type: "idle" | "success" | "error";
  message: string;
};

export type HashAlgorithm = "SHA-256" | "SHA-384" | "SHA-512";

export type PlaygroundTabId = "symmetric" | "hashing" | "rsa";

// ----- Constants -----
export const defaultPlaintext = "Edge Crypto keeps secrets safe across runtimes.";
export const defaultPassword = "super-secure-password";
export const defaultHashInput = "edge-crypto";
export const defaultRsaMessage = "The quick brown fox jumps over the lazy dog";

export const hashAlgorithms: HashAlgorithm[] = ["SHA-256", "SHA-384", "SHA-512"];

// ----- Label factories -----
export const getPlaygroundLabels = (isKorean: boolean) => ({
  symmetric: {
    encryptTitle: isKorean ? "암호문으로 암호화" : "Encrypt to ciphertext",
    encryptDesc: isKorean ? "비밀번호 기반 키를 사용한 AES-GCM." : "AES-GCM with password-derived keys.",
    encrypting: isKorean ? "암호화 중…" : "Encrypting…",
    message: isKorean ? "메시지" : "Message",
    password: isKorean ? "비밀번호" : "Password",
    encrypt: isKorean ? "암호화" : "Encrypt",
    ciphertextBase64: isKorean ? "암호문 (Base64)" : "Ciphertext (Base64)",
    decryptTitle: isKorean ? "암호문 복호화" : "Decrypt ciphertext",
    decryptDesc: isKorean ? "AES-GCM 페이로드를 붙여넣고 평문을 복구합니다." : "Paste an AES-GCM payload and recover the plaintext.",
    decrypting: isKorean ? "복호화 중…" : "Decrypting…",
    ciphertext: isKorean ? "암호문" : "Ciphertext",
    ciphertextPlaceholder: isKorean ? "encryptToString에서 생성된 암호문을 붙여넣으세요" : "Paste ciphertext generated from encryptToString",
    decrypt: isKorean ? "복호화" : "Decrypt",
    plaintext: isKorean ? "평문" : "Plaintext",
  },
  hashing: {
    title: isKorean ? "해싱" : "Hashing",
    desc: (algo: string) =>
      isKorean ? `SHA-${algo.slice(4)}로 다이제스트 생성` : `Generate digests with SHA-${algo.slice(4)}`,
    hashValue: isKorean ? "해시 값" : "Hash value",
    hashing: isKorean ? "해싱 중…" : "Hashing…",
    digest: isKorean ? "다이제스트" : "Digest",
    length: isKorean ? "길이" : "Length",
    chars: isKorean ? "문자" : "chars",
  },
  rsa: {
    encryptionTitle: isKorean ? "RSA-OAEP 암호화" : "RSA-OAEP Encryption",
    encryptionDesc: isKorean
      ? "브라우저에서 키를 생성한 다음 메시지를 암호화하고 복호화합니다."
      : "Generate keys in-browser, then encrypt and decrypt messages.",
    running: isKorean ? "실행 중…" : "Running…",
    generating: isKorean ? "생성 중…" : "Generating…",
    generate: isKorean ? "생성" : "Generate",
    regenerate: isKorean ? "재생성" : "Regenerate",
    messageToEncrypt: isKorean ? "암호화할 메시지" : "Message to encrypt",
    encrypt: isKorean ? "암호화" : "Encrypt",
    ciphertextBase64: isKorean ? "암호문 (Base64)" : "Ciphertext (Base64)",
    ciphertextToDecrypt: isKorean ? "복호화할 암호문" : "Ciphertext to decrypt",
    ciphertextPlaceholder: isKorean ? "RSA-OAEP로 생성된 암호문을 붙여넣으세요" : "Paste ciphertext generated with RSA-OAEP",
    decrypt: isKorean ? "복호화" : "Decrypt",
    plaintext: isKorean ? "평문" : "Plaintext",
    signingTitle: isKorean ? "RSA-PSS 서명" : "RSA-PSS Signing",
    signingDesc: isKorean
      ? "RSA-PSS로 메시지에 서명하고 쌍을 이루는 공개 키를 사용하여 검증합니다."
      : "Sign messages with RSA-PSS and verify using the paired public key.",
    messageToSign: isKorean ? "서명할 메시지" : "Message to sign",
    sign: isKorean ? "서명" : "Sign",
    signatureBase64: isKorean ? "서명 (Base64)" : "Signature (Base64)",
    messageToVerify: isKorean ? "검증할 메시지" : "Message to verify",
    signatureToVerify: isKorean ? "검증할 서명" : "Signature to verify",
    verify: isKorean ? "검증" : "Verify",
  },
});

