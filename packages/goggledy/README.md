<h1 align="center">
    <img src="./img/sticker.svg" width="75" />
    <br>
    Goggledy
</h1>

_Goggledy_ is a TypeScript library that lets you easily interact with
[Brave Search Goggles](https://github.com/brave/goggles-quickstart/).

> Try out the [REPL](https://gearchy.wolf.gdn/repl).

It can be used to parse Goggle code into a JavaScript representation, or to
generate goggle code from a Goggle object.

This opens the door for applications that want to interact with Goggles in a more programmatic way.
E.g. interactive editors, code generators, etc.

## Parsing Goggles

Parsing a goggle into a structured JavaScript representation holding all
the information about the Goggle with `Goggle.parse()`:

```ts
import { Goggle } from 'goggledy'

const goggle = Goggle.parse(
  `! name: Some name
   ! description: Some description`,
)

console.log(goggle.metaData.name) // Some name
```

## Generating Goggles

Generating Goggles from JavaScript representation with `Goggle.toString()`:

```ts
import * as goggledy from 'goggledy'

const goggle = new goggledy.Goggle(
  // Goggle lines, e.g. instructions, comments, etc.
  [
    new goggledy.GoggleEmpty(),
    new goggledy.GoggleComment('Some comment'),
    new goggledy.GoggleInstruction('pattern', {
      site: 'example.org',
      discard: true,
    }),
  ],
  // Goggle meta data
  {
    name: 'Some name',
    description: 'Some description',
    // This is a shorthand for:
    // `goggledy.GoggleMeta('name', 'Some name')`
    // under the lines array above.
  },
)

console.log(goggle.toString())
// ! name: Some name
// ...
```

## Comparison

See how to construct a Goggle in Goggledy and what values it returns with its
[`toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)
method, and when it is passed to [`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).

<!-- START TABLE -->
<!--
    THIS IS AN AUTOGENERATED AREA. DO NOT EDIT THIS AREA DIRECTLY.
    See `scripts/generate-comparison-table.js` for more information.
-->
<table>
<tr>
<th>Goggle</th>
<th>Goggledy</th>
<th>JSON</th>
</tr>

<tr>
<td>

```
! name: Some name
! description: Some description
! public: true
```

</td>
<td>

```js
new Goggle([], {
  name: 'Some name',
  description: 'Some description',
  public: true,
})
```

</td>
<td>

```json
{
  "metaData": {
    "name": "Some name",
    "description": "Some description",
    "public": true
  },
  "lines": [
    {
      "type": "meta",
      "key": "name",
      "value": "Some name"
    },
    {
      "type": "meta",
      "key": "description",
      "value": "Some description"
    },
    {
      "type": "meta",
      "key": "public",
      "value": true
    }
  ]
}
```

</td>
</tr>
<tr>
<td>

```
pattern$boost=10,incontent,site=example.org
```

</td>
<td>

```js
new GoggleInstruction('pattern', {
  boost: 10,
  incontent: true,
  site: 'example.org',
})
```

</td>
<td>

```json
{
  "type": "instruction",
  "pattern": "pattern",
  "options": {
    "boost": 10,
    "incontent": true,
    "site": "example.org"
  }
}
```

</td>
</tr>
<tr>
<td>

```
! name: value
```

</td>
<td>

```js
new GoggleMeta('name', 'value')
```

</td>
<td>

```json
{
  "type": "meta",
  "key": "name",
  "value": "value"
}
```

</td>
</tr>
<tr>
<td>

```
! comment
```

</td>
<td>

```js
new GoggleComment(' comment')
```

</td>
<td>

```json
{
  "type": "comment",
  "value": " comment"
}
```

</td>
</tr>
<tr>
<td>

```

```

</td>
<td>

```js
new GoggleEmpty()
```

</td>
<td>

```json
{
  "type": "empty"
}
```

</td>
</tr>
</table>
<!-- END TABLE -->

## Who uses Goggledy?

- [Gearchy](https://gearchy.wolf.gdn) uses Goggledy for two matters, parsing Goggles stored in GitHub gists
  to populate its interactive Goggle editor, and generating Goggles from the editor to
  store them back in GitHub gists.
