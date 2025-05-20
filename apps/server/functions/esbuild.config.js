import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

const functionsDir = './src/packages';

/**
 * @description functionsDir 하위의 namespace 목록을 배열로 반환하는 함수
 * @returns {string[]} function namespaces
 */
function getNamespace(functionsDir) {
  return fs.readdirSync(functionsDir).filter((file) => fs.statSync(path.join(functionsDir, file)).isDirectory());
}

function getFunctionPath(functionsDir, namespace) {
  return path.resolve(functionsDir, namespace);
}

async function buildFunctions() {
  // mkdir dist
  fs.mkdirSync('dist', { recursive: true });

  /** @example ['webhooks'] */
  const namespaces = getNamespace(functionsDir);

  console.debug(`📂 namespaces\n${namespaces.map((namespace, i) => `${i}\t${namespace}`).join('\n')}\n`);

  for (const namespace of namespaces) {
    console.debug(`📂 ${namespace}`);
    /** @example src/packages/webhooks */
    const functionPath = getFunctionPath(functionsDir, namespace);

    /** @example ['health', 'report'] */
    const functions = fs.readdirSync(functionPath);

    for (const func of functions) {
      console.debug(`${' '.repeat(2)}📕${func}`);
      console.debug(`${' '.repeat(4)}🚀 Building\t${namespace}/${func}/${func}.js`);

      await esbuild.build({
        entryPoints: [`${functionPath}/${func}/${func}.ts`],
        outfile: `dist/packages/${namespace}/${func}/${func}.js`,
        bundle: true, // 모든 의존성을 하나의 파일로 번들링
        platform: 'node',
        target: 'node16',
        format: 'cjs', // DigitalOcean Functions는 CommonJS 사용 가능
        sourcemap: false,
        treeShaking: true,
        minify: true,
        keepNames: true,
        external: [], // 외부 모듈을 포함하도록 설정
      });

      console.debug(`${' '.repeat(4)}✅ Built\t${namespace}/${func}/${func}.js`);
    }
  }
}

buildFunctions().catch((err) => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
