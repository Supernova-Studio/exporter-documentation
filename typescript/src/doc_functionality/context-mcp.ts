import slugify from '@sindresorhus/slugify';
import { Base64 } from 'js-base64';

const CONTEXT_MCP_URL_SLUG_MAX_LENGTH = 50;

export type ContextMcpConnection =
  | 'cursor'
  | 'claudeCode'
  | 'vsCode'
  | 'codex'
  | 'codeSnippet'
  | 'url';

export type ContextMcpInstallOptions = {
  mcpUrl: string;
  cursorInstallUrl: string;
  vsCodeInstallUrl: string;
  claudeCodeCommand: string;
  codexCommand: string;
  mcpServerConfigJson: string;
};

export type ContextMcpAction = {
  id: ContextMcpConnection;
  label: string;
  description?: string;
  icon: string;
  value: string;
  startsGroup: boolean;
};

const connectionGroups: ContextMcpConnection[][] = [
  ['cursor', 'vsCode'],
  ['claudeCode', 'codex'],
  ['codeSnippet', 'url'],
];

function slugifyContextName(contextName: string): string {
  return slugify(contextName)
    .slice(0, CONTEXT_MCP_URL_SLUG_MAX_LENGTH)
    .replace(/-+$/g, '');
}

export function getContextMcpInstallOptions(
  baseMcpUrl: string,
  contextId?: string | null,
  contextName?: string | null,
): ContextMcpInstallOptions {
  const normalizedBaseMcpUrl = baseMcpUrl.replace(/\/+$/g, '');
  const mcpUrl =
    contextId && contextName
      ? `${normalizedBaseMcpUrl}/mcp/c/${contextId}-${slugifyContextName(contextName)}`
      : `${normalizedBaseMcpUrl}/mcp`;
  const cursorConfig = Base64.encode(JSON.stringify({ url: mcpUrl }));
  const vsCodeConfig = {
    name: 'Supernova',
    type: 'http',
    url: mcpUrl,
  };
  const mcpServerConfigJson = JSON.stringify(
    {
      mcpServers: {
        supernova: {
          url: mcpUrl,
          type: 'http',
        },
      },
    },
    null,
    2,
  );

  return {
    mcpUrl,
    cursorInstallUrl: `cursor://anysphere.cursor-deeplink/mcp/install?name=Supernova&config=${cursorConfig}`,
    vsCodeInstallUrl: `vscode:mcp/install?${encodeURIComponent(
      JSON.stringify(vsCodeConfig),
    )}`,
    claudeCodeCommand: `claude mcp add --transport http supernova-mcp '${mcpUrl}'`,
    codexCommand: `codex mcp add supernova-mcp --url '${mcpUrl}'`,
    mcpServerConfigJson,
  };
}

export function getContextMcpActions(
  connections: unknown,
  options: ContextMcpInstallOptions,
): ContextMcpAction[] {
  const enabledConnections = new Set(
    Array.isArray(connections) ? connections : [],
  );
  const actions: Record<ContextMcpConnection, ContextMcpAction> = {
    cursor: {
      id: 'cursor',
      label: 'Add to Cursor',
      icon: 'cursor',
      value: options.cursorInstallUrl,
      startsGroup: false,
    },
    vsCode: {
      id: 'vsCode',
      label: 'Add to VS Code',
      icon: 'vs-code',
      value: options.vsCodeInstallUrl,
      startsGroup: false,
    },
    claudeCode: {
      id: 'claudeCode',
      label: 'Copy Claude Code command',
      description: 'Run copied command in your terminal.',
      icon: 'claude',
      value: options.claudeCodeCommand,
      startsGroup: false,
    },
    codex: {
      id: 'codex',
      label: 'Copy Codex command',
      description: 'Run copied command in your terminal.',
      icon: 'code',
      value: options.codexCommand,
      startsGroup: false,
    },
    codeSnippet: {
      id: 'codeSnippet',
      label: 'Copy MCP snippet',
      description:
        'Paste into mcp_config.json in settings of your code editor.',
      icon: 'code',
      value: options.mcpServerConfigJson,
      startsGroup: false,
    },
    url: {
      id: 'url',
      label: 'Copy MCP URL',
      description: 'Paste into any tool that supports custom MCP connectors.',
      icon: 'url',
      value: options.mcpUrl,
      startsGroup: false,
    },
  };

  return connectionGroups.reduce<ContextMcpAction[]>((result, group) => {
    const groupActions = group
      .filter((connection) => enabledConnections.has(connection))
      .map((connection, index) => ({
        ...actions[connection],
        startsGroup: result.length > 0 && index === 0,
      }));

    return result.concat(groupActions);
  }, []);
}
