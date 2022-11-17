# Distributed Systems Project - Carbon Aware Computing
This repo contains the Github action to handle the carbon awareness.

# Javascript action

-- change me --

## Inputs

### `duration`

**Required** -- change me --.

### `deadline`

**Required** -- change me --.

### `depends`

**Not required** -- change me --.

## Outputs

### `status`

The response of the server.

## Example

```yaml
name: CA Demo
run-name: Test CA-Action PoC
on:
  issues:
    types: [opened]
  repository_dispatch:
    types: [ca-action, do-stuff]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Test action
        uses: JulianTS/ds-pj-action@v1.1
        with:
          duration: '10'
          deadline: '24h'
      - name: Next step
        run: echo "Hello World"
```
