# Overview

Send comment to PR associated with branch.

# Using

```yml
steps:
  - name: PR comment
    uses: Janealter/pr-comment@releases/v1
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    with:
      msg: "Some message"
      ref: feature/example
```
