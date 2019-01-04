
  $(window).load(function(){
    var x2js = new X2JS();
    function convertXml2JSon(jsonString) {
        return (JSON.stringify(x2js.xml_str2json(jsonString)));
    }
    function convertJSon2XML(jsonString) {
        $("#textAreaXml").val(x2js.json2xml_str($.parseJSON(jsonString)));
    }

//////////////////XML////////////
    var editorTextAreaXml = document.getElementById('textAreaXml');
    $("#textAreaXml").on("keyup", function() {
      var xml = editorTextAreaXml.value;

      
      if (convertXml2JSon(xml) != "null"){
        editorTextAreaJson.set(JSON.parse(convertXml2JSon(xml)));
        editorTreeArea.set(JSON.parse(convertXml2JSon(xml)));
      }
      else{
        xml = "<root>" + xml + "</root>";
        editorTextAreaJson.set(JSON.parse(convertXml2JSon(xml)));
        editorTreeArea.set(JSON.parse(convertXml2JSon(xml)));
      }
  });
///////////////////////////////////

////////////JSON///////////////////
    var containerTextAreaJson = document.getElementById('textAreaJson');
    var optionsTextAreaJson = {
      mode: 'code',
      onChangeText: function (jsonString) {
        editorTreeArea.updateText(jsonString);
        convertJSon2XML(jsonString);
      },
      onError: function (err) {
        alert(err.toString());
      }
    };
    var editorTextAreaJson = new JSONEditor(containerTextAreaJson, optionsTextAreaJson);
/////////////JSON//////////////

///////////TREE/////////////////
    var containerTreeArea = document.getElementById('treeArea');
    var optionsTreeArea = {
    mode: 'tree',
    onChangeText: function (jsonString) {
      editorTextAreaJson.updateText(jsonString);
      convertJSon2XML(jsonString);
    },
    onError: function (err) {
      alert(err.toString());
    }
    };
    var editorTreeArea = new JSONEditor(containerTreeArea, optionsTreeArea);
////////////TREE////////////


    // set initial data in both editors
    var json = {"root":
    {"child":[
      {"textNode":"First & Child"},
      {"textNode":"Second Child"}],
      "testAttrs":{"attr1":"attr1Value"}}};
    convertJSon2XML(JSON.stringify(json));
    editorTextAreaJson.set(json);
    editorTreeArea.set(json);


    ///////////buttons/////////////
    $("#clear").click(function() {
      editorTextAreaJson.set(null);
      editorTreeArea.set(null);
      convertJSon2XML(JSON.stringify(null));
    });

  });






