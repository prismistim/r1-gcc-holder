export type ChangeLogItem = {
  version: string
  updated_date: string
  title: string
  description: string
}

export const changeLog: ChangeLogItem[] = [
  {
    version: '0.1.71',
    updated_date: '2024-05-15',
    title: 'バグ修正',
    description: '(内部的な問題を修正)'
  },
  {
    version: '0.1.7',
    updated_date: '2024-05-15',
    title: '機能改善、バグ修正',
    description: '有効期限表示を追加時に180日になるように修正、テスト用のダミーデータ挿入ボタンの表示、スキャンしたデータについてのバリデーションを追加'
  },
  {
    version: '0.1.65',
    updated_date: '2024-05-05',
    title: 'バグ修正',
    description: 'アプリアップデート時にリリース差分が表示されない問題を修正'
  },
  {
    version: '0.1.60',
    updated_date: '2024-05-05',
    title: '機能改善',
    description: '再チャージ時の画面デザインを現在のものに変更'
  },
  {
    version: '0.1.50',
    updated_date: '2024-05-05',
    title: '機能改善、その他追加',
    description:
      'カレンダーリマインド用のURLの作成方法を一部修正、注意事項の文言追加'
  },
  {
    version: '0.1.41',
    updated_date: '2024-05-04',
    title: '機能、表示改善',
    description: '初期化の操作位置を変更、カード表示改善'
  },
  {
    version: '0.1.30',
    updated_date: '2024-05-04',
    title: 'changelogの追加',
    description:
      'changelogを確認できるページを追加、アップデート時にchangelogの差分を表示する処理を追加'
  },
  {
    version: '0.1.20',
    updated_date: '2024-05-03',
    title: 'ロケーション追加',
    description: '奈良と東京の店舗情報を追加'
  },
  {
    version: '0.1.10',
    updated_date: '2024-05-02',
    title: 'アップデート対策追加',
    description: 'アップデート処理の実装、バージョン情報の管理機能の追加'
  },
  {
    version: '0.0.90',
    updated_date: '2024-04-29',
    title: '初期リリース',
    description: '基本的なUIの実装、PWA化のためのライブラリ等を追加'
  }
]
