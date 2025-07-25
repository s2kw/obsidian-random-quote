import { App, Plugin, PluginSettingTab, Setting, MarkdownView } from "obsidian";

/** プラグイン設定インターフェース */
interface RandomQuoteSettings {
  directories: string; // カンマ区切りのフォルダ名リスト
  marker: string;      // 引用を示すマーカー行プレフィックス
  blockType: string;   // [!...]内のラベル文字列
}

/** デフォルト設定 */
const DEFAULT_SETTINGS: RandomQuoteSettings = {
  directories: "Quotes",
  marker: "## Quote:",
  blockType: "tips"
};

export default class RandomQuotePlugin extends Plugin {
  settings: RandomQuoteSettings;

  /** 設定読み込み */
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  /** 設定保存 */
  async saveSettings() {
    await this.saveData(this.settings);
  }

  async onload() {
    await this.loadSettings();
    this.addSettingTab(new QuoteSettingTab(this.app, this));

    this.addCommand({
      id: "insert-random-quote",
      name: "Insert Random Quote from Files",
      callback: async () => {
        const editor = this.app
          .workspace
          .getActiveViewOfType(MarkdownView)
          ?.editor;
        if (!editor) return;

        // 設定から検索対象フォルダを取得
        const folders = this.settings.directories
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0);

        // 引用を収集
        const quotes = await getRandomQuotes(
          this.app,
          folders,
          this.settings.marker
        );

        if (quotes.length > 0) {
          // ランダムに1つの引用を選択して挿入
          const randomIndex = Math.floor(Math.random() * quotes.length);
          const quote = quotes[randomIndex];
          // Split the chosen quote into lines and prefix each with "> "
          const lines = quote.split(/\r?\n/);
          const prefixed = lines.map(line => `> ${line}`).join("\n");
          // Insert the info block heading and all lines with proper quoting
          editor.replaceSelection(`> [!${this.settings.blockType}]\n${prefixed}\n`);
        } else {
          editor.replaceSelection("> (No quotes found)");
        }
      },
    });
  }
}

/**
 * 複数フォルダからマーカー行に続くテキストを集め、配列で返す
 */
async function getRandomQuotes(
  app: App,
  directories: string[],
  marker: string
): Promise<string[]> {
  const quotes: string[] = [];

  for (const dir of directories) {
    const files = app.vault
      .getFiles()
      .filter((file) => file.path.startsWith(dir));

    for (const file of files) {
      const content = await app.vault.read(file);
      const lines = content.split(/\r?\n/);

      let collecting = false;
      let buffer: string[] = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.startsWith(marker)) {
          if (collecting && buffer.length > 0) {
            quotes.push(buffer.join("\n").trim());
            buffer = [];
          }
          collecting = true;
        } else if (collecting) {
          // collecting中は全行バッファに追加
          buffer.push(line);
        }
      }

      // 最後のブロックを収集
      if (collecting && buffer.length > 0) {
        quotes.push(buffer.join("\n").trim());
      }
    }
  }

  return quotes;
}

/** 設定タブ実装 */
class QuoteSettingTab extends PluginSettingTab {
  plugin: RandomQuotePlugin;

  constructor(app: App, plugin: RandomQuotePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Random Quote Settings" });

    new Setting(containerEl)
      .setName("Quote Folders")
      .setDesc("Comma-separated list of folder names to search")
      .addText((text) =>
        text
          .setPlaceholder("e.g. Quotes,Notes")
          .setValue(this.plugin.settings.directories)
          .onChange(async (value) => {
            this.plugin.settings.directories = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Marker Prefix")
      .setDesc("Line prefix that indicates a quote")
      .addText((text) =>
        text
          .setPlaceholder("e.g. ## Quote:")
          .setValue(this.plugin.settings.marker)
          .onChange(async (value) => {
            this.plugin.settings.marker = value;
            await this.plugin.saveSettings();
          })
      );

      new Setting(containerEl)
      .setName("Info Block Type")
      .setDesc("The label inside the [!...] block")
      .addText(text =>
        text
          .setPlaceholder("e.g. tips, note, warning")
          .setValue(this.plugin.settings.blockType)
          .onChange(async (value) => {
            this.plugin.settings.blockType = value;
            await this.plugin.saveSettings();
          })
      );




    }
}