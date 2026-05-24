interface EditorConfig {
  id: string;
  name: string;
  icon: string;
  description: string;
  usageGuide: string[];
}

export const EDITORS: EditorConfig[] = [
  {
    id: 'vscode',
    name: 'VS Code',
    icon: '📝',
    description: 'Visual Studio Code with GitHub Copilot',
    usageGuide: [
      '1. Create a ".github/agents" folder in your workspace.',
      '2. Move the downloaded agent file into this folder.',
      '3. Open Copilot Chat and @ mention your new agent.'
    ],
  },
  {
    id: 'cursor',
    name: 'Cursor',
    icon: '✨',
    description: 'Cursor IDE with built-in AI',
    usageGuide: [
      '1. Create a ".cursor/rules" folder in your workspace.',
      '2. Move the downloaded agent file into this folder.',
      '3. Cursor will automatically use it in AI chats.'
    ],
  },
  {
    id: 'kiro',
    name: 'Kiro',
    icon: '🚀',
    description: 'Kiro AI Code Editor',
    usageGuide: [
      '1. Create a ".kiro/agents" folder in your workspace.',
      '2. Move the downloaded agent file into this folder.',
      '3. Kiro will immediately recognize the new agent.'
    ],
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    icon: '🌌',
    description: 'Antigravity AI Development Platform',
    usageGuide: [
      '1. Create a ".claude/agents" folder in your workspace.',
      '2. Move the downloaded agent file into this folder.',
      '3. The agent is now ready to use.'
    ],
  },
  {
    id: 'other',
    name: 'Other Editors',
    icon: '🛠️',
    description: 'ChatGPT, Gemini, or other AI platforms',
    usageGuide: [
      '1. Create a ".claude/agents" folder in your workspace.',
      '2. Move the downloaded agent file into this folder.',
      '3. Your AI will reference it automatically.'
    ],
  },
];

export function getEditorConfig(id: string): EditorConfig | undefined {
  return EDITORS.find((editor) => editor.id === id);
}
