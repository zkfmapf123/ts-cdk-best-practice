# YML-TS-Init

## 초기설정

> Project 설정

```sh
    ## Folder Naming 수정
    lib -> stacks
    bin -> apps

    ## Update (cdk.json)
    "app": "npx ts-node --prefer-ts-exts bin/yml-ts-cdk.ts" >> "app": "npx ts-node --prefer-ts-exts apps/yml-ts-cdk.ts",

    ## Added (tsconfig.json)
    outDir : "dist" ## Added
    ...
    "exclude": ["node_modules", "cdk.out", "dist/**/*"]

```

## Useful Commands

```
npm run build
npm run watch
npm run test
npx cdk deploy
npx cdk diff
npx cdk synth
```
