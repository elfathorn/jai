<?php
if (array_key_exists('minify', $_POST)) {
  file_put_contents('../build/jai.min.js', $_POST['minify']);
  file_put_contents('../build/jai.js', $_POST['no-minify']);
  echo 'Save done !';
  exit;
}
?>

<html>
  <head>
    <script type="text/javascript" src="jquery.min.js"></script>
    <script type="text/javascript">
      $(document).ready(function() {
        // lorsque je soumets le formulaire
        $('#monForm').on('submit', function() {
            $.ajax({
                url: $(this).attr('action'),
                type: $(this).attr('method'),
                data: $(this).serialize(),
                success: function(html) {
                  $("#minify").html(html);

                  $.ajax({
                      url: $('#monFormMinify').attr('action'),
                      type: $('#monFormMinify').attr('method'),
                      data: $('#monFormMinify').serialize(), 
                      success: function(html) {
                        alert(html);
                      }
                  });
                  return false;
                }
            });
            return false;
        });
      });
    </script>
  </head>
  <body>
    <h3>Build your proper jAI files</h3>
    <form id="monForm" action="http://closure-compiler.appspot.com/compile" method="post">
    <textarea name="js_code" style="visibility:hidden;display:none;">
<?php
$js = file_get_contents('../src/Jai.js');
$js .= file_get_contents('../src/core/Point.js');
$js .= file_get_contents('../src/core/Node.js');
$js .= file_get_contents('../src/core/Map.js');
$js .= file_get_contents('../src/core/Astar.js');
echo $js;
?>
    </textarea>
    <input type="hidden" name="compilation_level" value="WHITESPACE_ONLY">
    <input type="hidden" name="output_format" value="text">
    <input type="hidden" name="output_info" value="compiled_code">
    <input type="submit" value="Build jAI files !">
    </form>

    <form id="monFormMinify" action="/utils/build.php" method="post" style="visibility:hidden;display:none;">
      <textarea name="minify" id="minify"></textarea>
      <textarea name="no-minify" id="no-minify"><?php echo $js; ?></textarea>
    </form>
  </body>
</html>