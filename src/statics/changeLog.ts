export type ChangeLogItem = {
  version: string
  updated_date: string
  title: string
  description: string
}

export const changeLog: ChangeLogItem[] = [
  {
    version: '0.1.3',
    updated_date: '2024-05-04',
    title: 'changelogの追加',
    description:
      'changelogを確認できるページを追加、アップデート時にchangelogの差分を表示する処理を追加'
  },
  {
    version: '0.1.2',
    updated_date: '2024-05-03',
    title: 'ロケーション追加',
    description: '奈良と東京の店舗情報を追加'
  },
  {
    version: '0.1.1',
    updated_date: '2024-05-02',
    title: 'アップデート対策追加',
    description: 'アップデート処理の実装、バージョン情報の管理機能の追加'
  },
  {
    version: '0.0.9',
    updated_date: '2024-04-29',
    title: '初期リリース',
    description: '基本的なUIの実装、PWA化のためのライブラリ等を追加'
  }
]
