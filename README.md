# 時刻表アプリ

[時刻表](https://totto2727.github.io/school-bus-timetable/)

千歳科学技術大学専用バス時刻表アプリです。

学生(B3)が現在開発しています。

## Frontend

### Language

- TypeScript

### GUI Framework

- React.js
- Material UI

### Library

- date-fns (unused)
- Axios

### linter&formatter
- Prettier
- ESLint

## Backend

### Environment

- GAS

### Language

- JavaScript

### Database

- SpreadSheet

## 今後の予定

### FrontEnd

- 折りたたみの概要欄に次のバスの発車時刻を表示
- 現在地から一番近い乗り場の列を強調表示
- 時刻の過ぎた列を非表示、もしくは透明化
- 管理者用画面の実装

### Backend

- SpreadSheetが扱いにくかったため、AWSのAppSync(GraphQL+Amazon DynamoDB)に変更する予定
    - GASやAWSに詳しい人いたら教えて下さい

### Else

- 今後どう運用していくか大学の先生方･職員方に相談
