# YML-TS-Init

## Project 설정 (기존 CDK 에서 수정한 부분)

1. .vscode 추가, .prettierrc 추가
2. Folder Naming 변경

    - lib -> stacks
    - bin -> apps
3. cdk.json 수정

```sh
## Before
"app": "npx ts-node --prefer-ts-exts bin/yml-ts-cdk.ts"

## After
"app": "npx ts-node --prefer-ts-exts apps/yml-ts-cdk.ts"
```

4. tsconfig.json 추가

```sh
## Update
outDir : "dist"
...
exclude: ["node_modules", "cdk.out", "dist/**/*"]
```

5. package.json 수정 + CLI 환경으로 수정

## CLI 구성

```sh
    ## Go Module 구성 (Optional)
    cd cli && go mod init [...]

    ## Project Path
    npm run cli:init

    ## CDK
    npm run cli
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
