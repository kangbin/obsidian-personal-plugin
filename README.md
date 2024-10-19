# obsidian-personal-plugin

## [发布](https://docs.obsidian.md/Plugins/Releasing/Release+your+plugin+with+GitHub+Actions)

1. 更新 `package.json` 中的 `version`
2. 执行 `npm run version`
3. 推送代码至远端之后，顺序执行 `git tag -a 1.0.1 -m "1.0.1"` 和 `git push origin 1.0.1`，此时会触发 github action 执行自动构建；
4. 构建完成之后，进入仓库主页面，点击右侧的 **Releases** 按钮，点击刚刚构建好的版本右侧的编辑按钮，填写本次发布的更新内容，点击下方的按钮发布即可。
