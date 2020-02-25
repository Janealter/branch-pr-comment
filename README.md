# Overview

Send comment to PR associated with branch.

# Using

```yml
steps:
  - name: PR comment
    uses: Janealter/branch-pr-comment@v1
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    with:
      message: "Some message"
      branch: feature/example
```
