# Lazy Plugin for jQuery

## Install

```javascript
npm install sotayamashita/jquery_lazy --save-dev
```


## Usage

```javascript
<script src="jquery.js" type="text/javascript"></script>
<script src="jquery.lazy.js" type="text/javascript"></script>
```

```javascript
$('.target').lazy(function(el) {
  console.log(el);
});
```

## Example

**Request**:

```javascript
$('.target').lazy(function(el) {
  var id = $(el).attr('data-id');
  $.ajax({
      type: 'POST',
      url: '/send',
      data: {
        id: id
      }
  });
})
```


## License

MIT © Sota Yamashita
