//Images
let IMG_RIGHT="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABHNCSVQICAgIfAhkiAAAAKZJREFUKJGdksENxCAMBBckKqEE9+GCqYYC+GOk2L7PRUoiknA3P4RnsWwCDri744EQQjie49PlGyeZiAgAxhjjrYsTzMyqqv7ArWhmthfZlyW5996PIjPzfvcqb9u2zcRrwFQWEXF3FxG5m8lMjrPCGbM1RgCIMUYASCmlnHNeDQRwHlhrrf0UcF2Vquq+rlJKWQqYfRIzs6UOiIhqrVVE5KeX/+EDfSftXvuCklwAAAAASUVORK5CYII=";
let IMG_LEFT="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABHNCSVQICAgIfAhkiAAAAKBJREFUKJGVksENRCEIRNHESijBPijYaizAu5jIspc1IebrZ99JJwxGhgAbqqq7ZgkhhHWOt8Kb0WVWVR1jDACAnHN+LT4hIkJE5DZ/ftj7sYE1Lo2IyDbovfereddtgznnPJpPX2JmVlVlZgZ4mPYexw13zoiIKaUEABBj9O8HImJrrb0ObFFKKSsmERFXVAsbjXtJnl5mZq611tf1/IcvRQTtXq9F+dwAAAAASUVORK5CYII=";
let IMG_STR1="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC";
let IMG_STR2="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==";
//If then
Blockly.Blocks['if_then'] = {
  init: function() {
    this.appendValueInput("BOOL")
        .setCheck("Boolean")
        .appendField("if");
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("then");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['if_then'] = function(block) {
var value_bool = Blockly.JavaScript.valueToCode(block, 'BOOL', Blockly.JavaScript.ORDER_ATOMIC);
var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
var code = 'if('+String(value_bool)+'){'+statements_do+'}\n';
return code;
};
//If then else
Blockly.Blocks['if_then_else'] = {
  init: function() {
    this.appendValueInput("BOOL")
        .setCheck("Boolean")
        .appendField("if");
    this.appendStatementInput("THEN")
        .setCheck(null)
        .appendField("then");
    this.appendStatementInput("ELSE")
        .setCheck(null)
        .appendField("else");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['if_then_else'] = function(block) {
var value_bool = Blockly.JavaScript.valueToCode(block, 'BOOL', Blockly.JavaScript.ORDER_ATOMIC);
var statements_then = Blockly.JavaScript.statementToCode(block, 'THEN');
var statements_else = Blockly.JavaScript.statementToCode(block, 'ELSE');
var code = 'if('+String(value_bool)+'){'+statements_then+'}else{'+statements_else+'}\n';
return code;
};
//While
Blockly.Blocks['while'] = {
  init: function() {
    this.appendValueInput("BOOL")
        .setCheck("Boolean")
        .appendField("while");
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['while'] = function(block) {
var value_bool = Blockly.JavaScript.valueToCode(block, 'BOOL', Blockly.JavaScript.ORDER_ATOMIC);
var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
var code = 'while('+String(value_bool)+'){'+statements_do+'}\n';
return code;
};
//break
Blockly.Blocks['break'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("break");
    this.setPreviousStatement(true, null);
    this.setColour(65);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['break'] = function(block) {
  var code = 'break;\n';
  return code;
};
//True
Blockly.Blocks['true'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("true");
    this.setOutput(true, null);
    this.setColour(105);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['true'] = function(block) {
  var code = 'true';
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//False
Blockly.Blocks['false'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("false");
    this.setOutput(true, null);
    this.setColour(105);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['false'] = function(block) {
  var code = 'false';
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Not
Blockly.Blocks['not'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("Boolean")
        .appendField("not");
    this.setOutput(true, null);
    this.setColour(105);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['not'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '!'+value_name;
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//And
Blockly.Blocks['and'] = {
  init: function() {
    this.appendValueInput("B1")
        .setCheck("Boolean");
    this.appendDummyInput()
        .appendField("and");
    this.appendValueInput("B2")
        .setCheck("Boolean");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(105);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['and'] = function(block) {
  var b1 = Blockly.JavaScript.valueToCode(block, 'B1', Blockly.JavaScript.ORDER_ATOMIC);
  var b2 = Blockly.JavaScript.valueToCode(block, 'B2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = b1+"&&"+b2;
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Or
Blockly.Blocks['or'] = {
  init: function() {
    this.appendValueInput("B1")
        .setCheck("Boolean");
    this.appendDummyInput()
        .appendField("or");
    this.appendValueInput("B2")
        .setCheck("Boolean");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(105);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['or'] = function(block) {
  var b1 = Blockly.JavaScript.valueToCode(block, 'B1', Blockly.JavaScript.ORDER_ATOMIC);
  var b2 = Blockly.JavaScript.valueToCode(block, 'B2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = b1+"||"+b2;
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Number
Blockly.Blocks['number_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0), "INP");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['number_value'] = function(block) {
  var number_inp = block.getFieldValue('INP');
  var code = String(number_inp);
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Math add
Blockly.Blocks['m_add'] = {
  init: function() {
    this.appendValueInput("N1")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField("+");
    this.appendValueInput("N2")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['m_add'] = function(block) {
  var value_n1 = Blockly.JavaScript.valueToCode(block, 'N1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_n2 = Blockly.JavaScript.valueToCode(block, 'N2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = String(value_n1)+'+'+String(value_n2);
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Math subtract
Blockly.Blocks['m_subtract'] = {
  init: function() {
    this.appendValueInput("N1")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField("-");
    this.appendValueInput("N2")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['m_subtract'] = function(block) {
  var value_n1 = Blockly.JavaScript.valueToCode(block, 'N1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_n2 = Blockly.JavaScript.valueToCode(block, 'N2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = String(value_n1)+'-'+String(value_n2);
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Math multiply
Blockly.Blocks['m_multiply'] = {
  init: function() {
    this.appendValueInput("N1")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField("*");
    this.appendValueInput("N2")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['m_multiply'] = function(block) {
  var value_n1 = Blockly.JavaScript.valueToCode(block, 'N1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_n2 = Blockly.JavaScript.valueToCode(block, 'N2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = String(value_n1)+'*'+String(value_n2);
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Math subdivide
Blockly.Blocks['m_subdivide'] = {
  init: function() {
    this.appendValueInput("N1")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField("/");
    this.appendValueInput("N2")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['m_subdivide'] = function(block) {
  var value_n1 = Blockly.JavaScript.valueToCode(block, 'N1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_n2 = Blockly.JavaScript.valueToCode(block, 'N2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = String(value_n1)+'/'+String(value_n2);
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Math equal
Blockly.Blocks['m_equal'] = {
  init: function() {
    this.appendValueInput("N1")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField("==");
    this.appendValueInput("N2")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['m_equal'] = function(block) {
  var value_n1 = Blockly.JavaScript.valueToCode(block, 'N1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_n2 = Blockly.JavaScript.valueToCode(block, 'N2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = String(value_n1)+"=="+String(value_n2);
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Math not equal
Blockly.Blocks['m_not_equal'] = {
  init: function() {
    this.appendValueInput("N1")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField("!=");
    this.appendValueInput("N2")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['m_not_equal'] = function(block) {
  var value_n1 = Blockly.JavaScript.valueToCode(block, 'N1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_n2 = Blockly.JavaScript.valueToCode(block, 'N2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = String(value_n1)+"!="+String(value_n2);
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Math bigger equal
Blockly.Blocks['m_big_equal'] = {
  init: function() {
    this.appendValueInput("N1")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField("<=");
    this.appendValueInput("N2")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['m_big_equal'] = function(block) {
  var value_n1 = Blockly.JavaScript.valueToCode(block, 'N1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_n2 = Blockly.JavaScript.valueToCode(block, 'N2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = String(value_n1)+"<="+String(value_n2);
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Math smaller equal
Blockly.Blocks['m_sma_equal'] = {
  init: function() {
    this.appendValueInput("N1")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField(">=");
    this.appendValueInput("N2")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['m_sma_equal'] = function(block) {
  var value_n1 = Blockly.JavaScript.valueToCode(block, 'N1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_n2 = Blockly.JavaScript.valueToCode(block, 'N2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = String(value_n1)+">="+String(value_n2);
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Math bigger
Blockly.Blocks['m_big'] = {
  init: function() {
    this.appendValueInput("N1")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField("<");
    this.appendValueInput("N2")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['m_big'] = function(block) {
  var value_n1 = Blockly.JavaScript.valueToCode(block, 'N1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_n2 = Blockly.JavaScript.valueToCode(block, 'N2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = String(value_n1)+"<"+String(value_n2);
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Math smaller
Blockly.Blocks['m_sma'] = {
  init: function() {
    this.appendValueInput("N1")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField(">");
    this.appendValueInput("N2")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['m_sma'] = function(block) {
  var value_n1 = Blockly.JavaScript.valueToCode(block, 'N1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_n2 = Blockly.JavaScript.valueToCode(block, 'N2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = String(value_n1)+">"+String(value_n2);
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Math operation
Blockly.Blocks['math_operation'] = {
  init: function() {
    this.appendValueInput("NUM")
        .setCheck("Number")
        .appendField(new Blockly.FieldDropdown([["cos","cos"], ["sin","sin"], ["tan","tan"], ["abs","abs"], ["round","round"], ["sqrt","sqrt"]]), "INP");
    this.setInputsInline(false);
    this.setOutput(true, "Number");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['math_operation'] = function(block) {
  var inp = block.getFieldValue('INP');
  var value_num = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'Math.'+String(inp)+"("+String(value_num)+")";
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//String value
Blockly.Blocks['string_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage(IMG_STR1, 15, 10, { alt: "", flipRtl: "TRUE" }))
        .appendField(new Blockly.FieldTextInput(""), "TXT")
        .appendField(new Blockly.FieldImage(IMG_STR2, 15, 10, { alt: "", flipRtl: "TRUE" }));
    this.setOutput(true, null);
    this.setColour(150);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['string_value'] = function(block) {
  var text_txt = block.getFieldValue('TXT');
  var code = '"'+text_txt+'"';
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Join strings
Blockly.Blocks['string_join'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("join");
    this.appendValueInput("s1")
        .setCheck("String")
        .appendField("str1");
    this.appendValueInput("s2")
        .setCheck("String")
        .appendField("str2");
    this.setInputsInline(false);
    this.setOutput(true, "String");
    this.setColour(150);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['string_join'] = function(block) {
  var value_s1 = Blockly.JavaScript.valueToCode(block, 's1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_s2 = Blockly.JavaScript.valueToCode(block, 's2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = value_s1+"+"+value_s2;
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Length of string
Blockly.Blocks['string_length'] = {
  init: function() {
    this.appendValueInput("TXT")
        .setCheck("String")
        .appendField("length");
    this.setInputsInline(false);
    this.setOutput(true, "Number");
    this.setColour(150);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['string_length'] = function(block) {
  var value_txt = Blockly.JavaScript.valueToCode(block, 'TXT', Blockly.JavaScript.ORDER_ATOMIC);
  var code = value_txt+".length";
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Strings equal
Blockly.Blocks['string_equal'] = {
  init: function() {
    this.appendValueInput("s1")
        .setCheck("String");
    this.appendDummyInput()
        .appendField("=");
    this.appendValueInput("s2")
        .setCheck("String");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(150);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['string_equal'] = function(block) {
  var s1 = Blockly.JavaScript.valueToCode(block, 's1', Blockly.JavaScript.ORDER_ATOMIC);
  var s2 = Blockly.JavaScript.valueToCode(block, 's2', Blockly.JavaScript.ORDER_ATOMIC);
  var code=s1+"=="+s2;
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//String starts
Blockly.Blocks['string_starts'] = {
  init: function() {
    this.appendValueInput("s1")
        .setCheck("String")
        .appendField("starts");
    this.appendValueInput("s2")
        .setCheck("String")
        .appendField("with");
    this.setOutput(true, "Boolean");
    this.setColour(150);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['string_starts'] = function(block) {
  var s1 = Blockly.JavaScript.valueToCode(block, 's1', Blockly.JavaScript.ORDER_ATOMIC);
  var s2 = Blockly.JavaScript.valueToCode(block, 's2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = value_s1+".startsWith("+s2+")";
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//String ends
Blockly.Blocks['string_ends'] = {
  init: function() {
    this.appendValueInput("s1")
        .setCheck("String")
        .appendField("ends");
    this.appendValueInput("s2")
        .setCheck("String")
        .appendField("with");
    this.setOutput(true, "Boolean");
    this.setColour(150);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['string_ends'] = function(block) {
  var s1 = Blockly.JavaScript.valueToCode(block, 's1', Blockly.JavaScript.ORDER_ATOMIC);
  var s2 = Blockly.JavaScript.valueToCode(block, 's2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = value_s1+".endsWith("+s2+")";
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Split String
Blockly.Blocks['string_split'] = {
  init: function() {
    this.appendValueInput("s1")
        .setCheck("String")
        .appendField("split string");
    this.appendValueInput("s2")
        .setCheck("String")
        .appendField("segment");
    this.setInputsInline(false);
    this.setOutput(true, "Array");
    this.setColour(150);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['string_split'] = function(block) {
  var value_s1 = Blockly.JavaScript.valueToCode(block, 's1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_s2 = Blockly.JavaScript.valueToCode(block, 's2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = value_s1+".split("+value_s2+")";
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Empty list
Blockly.Blocks['list_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("create empty list");
    this.setOutput(true, "Array");
    this.setColour(20);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['list_value'] = function(block) {
return ["[]", Blockly.JavaScript.ORDER_NONE];};
//Add to list
Blockly.Blocks['list_add'] = {
  init: function() {
    this.appendValueInput("list")
        .setCheck("Array")
        .appendField("add to list");
    this.appendValueInput("item")
        .setCheck(null)
        .appendField("item");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['list_add'] = function(block) {
  var value_list = Blockly.JavaScript.valueToCode(block, 'list', Blockly.JavaScript.ORDER_ATOMIC);
  var value_item = Blockly.JavaScript.valueToCode(block, 'item', Blockly.JavaScript.ORDER_ATOMIC);
  var code = value_list+'.push('+value_item+');\n';
  return code;
};
//Get from list
Blockly.Blocks['list_get'] = {
  init: function() {
    this.appendValueInput("list")
        .setCheck("Array")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("from list");
    this.appendValueInput("index")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("get item index");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(20);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['list_get'] = function(block) {
  var value_list = Blockly.JavaScript.valueToCode(block, 'list', Blockly.JavaScript.ORDER_ATOMIC);
  var value_index = Blockly.JavaScript.valueToCode(block, 'index', Blockly.JavaScript.ORDER_ATOMIC);
  var code = value_list+"["+value_index+"]";
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Length of list
Blockly.Blocks['list_length'] = {
  init: function() {
    this.appendValueInput("TXT")
        .setCheck("Array")
        .appendField("length");
    this.setInputsInline(false);
    this.setOutput(true, "Number");
    this.setColour(20);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['list_length'] = function(block) {
  var value_txt = Blockly.JavaScript.valueToCode(block, 'TXT', Blockly.JavaScript.ORDER_ATOMIC);
  var code = value_txt+".length";
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Set item of list
Blockly.Blocks['list_set'] = {
  init: function() {
    this.appendValueInput("list")
        .setCheck("Array")
        .appendField("set item of list");
    this.appendValueInput("index")
        .setCheck("Number")
        .appendField("index");
    this.appendValueInput("item")
        .setCheck(null)
        .appendField("new value");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['list_set'] = function(block) {
  var value_list = Blockly.JavaScript.valueToCode(block, 'list', Blockly.JavaScript.ORDER_ATOMIC);
  var value_index = Blockly.JavaScript.valueToCode(block, 'index', Blockly.JavaScript.ORDER_ATOMIC);
  var value_item = Blockly.JavaScript.valueToCode(block, 'item', Blockly.JavaScript.ORDER_ATOMIC);
  var code = value_list+'['+value_index+']='+value_item+';\n';
  return code;
};
//Empty dictionary
Blockly.Blocks['dict_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("create empty dictionary");
    this.setOutput(true, "Dictionary");
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
}};
Blockly.JavaScript['dict_value'] = function(block) {
return ["{}", Blockly.JavaScript.ORDER_NONE];};
//Edit value of dictionary
Blockly.Blocks['dict_set'] = {
  init: function() {
    this.appendValueInput("dict")
        .setCheck("Dictionary")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("edit key of dictionary");
    this.appendValueInput("key")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("key");
    this.appendValueInput("value")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("new value");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['dict_set'] = function(block) {
  var value_dict = Blockly.JavaScript.valueToCode(block, 'dict', Blockly.JavaScript.ORDER_ATOMIC);
  var value_key = Blockly.JavaScript.valueToCode(block, 'key', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = value_dict+'['+value_key+']='+value_value+';\n';
  return code;
};
//Get value from dictionary
Blockly.Blocks['dict_get'] = {
  init: function() {
    this.appendValueInput("dict")
        .setCheck("Dictionary")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("get value of dictionary");
    this.appendValueInput("key")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("key");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(330);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['dict_get'] = function(block) {
  var value_dict = Blockly.JavaScript.valueToCode(block, 'dict', Blockly.JavaScript.ORDER_ATOMIC);
  var value_key = Blockly.JavaScript.valueToCode(block, 'key', Blockly.JavaScript.ORDER_ATOMIC);
  var code=value_dict+"["+value_key+"]";
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Set Global variable
Blockly.Blocks['set_global'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck(null)
        .appendField("Set global variable")
        .appendField(new Blockly.FieldTextInput("myVariable"), "name")
        .appendField("to");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['set_global'] = function(block) {
  var text_name = block.getFieldValue('name');
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'this.'+text_name+'='+value_value+';\n';
  return code;
};
//Get Global variable
Blockly.Blocks['get_global'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get global variable")
        .appendField(new Blockly.FieldTextInput("myVariable"), "nm");
    this.setOutput(true, null);
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['get_global'] = function(block) {
  var text_nm = block.getFieldValue('nm');
  var code = "this."+text_nm;
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Set Game variable
Blockly.Blocks['set_game'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck(null)
        .appendField("Set game variable")
        .appendField(new Blockly.FieldTextInput("myVariable"), "name")
        .appendField("to");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['set_game'] = function(block) {
  var text_name = block.getFieldValue('name');
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "bapi_set_gamevar('"+text_name+"',"+value_value+");\n";
  return code;
};
//Get Game variable
Blockly.Blocks['get_game'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get game variable")
        .appendField(new Blockly.FieldTextInput("myVariable"), "nm");
    this.setOutput(true, null);
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['get_game'] = function(block) {
  var text_nm = block.getFieldValue('nm');
  var code = "bapi_get_gamevar('"+text_nm+"')";
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Local variable
Blockly.Blocks['local_variable'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck(null)
        .appendField("initialize local variable")
        .appendField(new Blockly.FieldTextInput("myVariable"), "varname")
        .appendField("to");
    this.appendStatementInput("todo")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['local_variable'] = function(block) {
  var text_varname = block.getFieldValue('varname');
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var stt = Blockly.JavaScript.statementToCode(block, 'todo');
  var code = 'if(true){let '+text_varname+'='+value_value+';'+stt+'}\n';
  return code;
};
//Set variable
Blockly.Blocks['set_var'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("set local variable")
        .appendField(new Blockly.FieldTextInput("myVariable"), "varname")
        .appendField("to");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['set_var'] = function(block) {
  var text_varname = block.getFieldValue('varname');
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "var "+text_varname+"="+value_name+';\n';
  return code;
};
//Get variable
Blockly.Blocks['get_var'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get local variable")
        .appendField(new Blockly.FieldTextInput("myVariable"), "varname");
    this.setOutput(true, null);
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['get_var'] = function(block) {
  var text_varname = block.getFieldValue('varname');
  var code = text_varname;
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Function
Blockly.Blocks['function'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("myFunction"), "name");
    this.appendStatementInput("todo")
        .setCheck(null);
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['function'] = function(block) {
  var text_name = block.getFieldValue('name');
  var statements_todo = Blockly.JavaScript.statementToCode(block, 'todo');
  var code = 'function '+text_name+'(input_argument){'+statements_todo+'}\n';
  return code;
};
//Run function
Blockly.Blocks['run_function'] = {
  init: function() {
    this.appendValueInput("arg")
        .setCheck(null)
        .appendField("run function")
        .appendField(new Blockly.FieldTextInput("myFunction"), "fn")
        .appendField("argument");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['run_function'] = function(block) {
  var text_fn = block.getFieldValue('fn');
  var value_arg = Blockly.JavaScript.valueToCode(block, 'arg', Blockly.JavaScript.ORDER_ATOMIC);
  var code = text_fn+'('+value_arg+');\n';
  return code;
};
//Get argument
Blockly.Blocks['get_arg'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get argument");
    this.setOutput(true, null);
    this.setColour(240);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['get_arg'] = function(block) {
  var code = 'input_argument';
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Set X
Blockly.Blocks['d_setlocx'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set location X");
    this.appendValueInput("object")
        .setCheck("String")
        .appendField("of object");
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("to");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_setlocx'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'bapi_gobj('+value_object+').position.x='+value_value+';\n';
  return code;
};
//Set Y
Blockly.Blocks['d_setlocy'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set location Y");
    this.appendValueInput("object")
        .setCheck("String")
        .appendField("of object");
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("to");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_setlocy'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'bapi_gobj('+value_object+').position.y='+value_value+';\n';
  return code;
};
//Set Z
Blockly.Blocks['d_setlocz'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set location Z");
    this.appendValueInput("object")
        .setCheck("String")
        .appendField("of object");
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("to");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_setlocz'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'bapi_gobj('+value_object+').position.z='+value_value+';\n';
  return code;
};
//Set X rot
Blockly.Blocks['d_setrotx'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set rotation X");
    this.appendValueInput("object")
        .setCheck("String")
        .appendField("of object");
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("to");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_setrotx'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'bapi_gobj('+value_object+').rotation.x=rad*'+value_value+';\n';
  return code;
};
//Set Y rot
Blockly.Blocks['d_setroty'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set rotation Y");
    this.appendValueInput("object")
        .setCheck("String")
        .appendField("of object");
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("to");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_setroty'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'bapi_gobj('+value_object+').rotation.y=rad*'+value_value+';\n';
  return code;
};
//Set Z rot
Blockly.Blocks['d_setrotz'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set rotation Z");
    this.appendValueInput("object")
        .setCheck("String")
        .appendField("of object");
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("to");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_setrotz'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'bapi_gobj('+value_object+').rotation.z=rad*'+value_value+';\n';
  return code;
};
//Set scale
Blockly.Blocks['d_setscale'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set scale (1 is default)");
    this.appendValueInput("object")
        .setCheck("String")
        .appendField("of object");
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("to");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_setscale'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'bapi_gobj('+value_object+').scale.set('+value_value+','+value_value+','+value_value+');\n';
  return code;
};
//Change X by
Blockly.Blocks['d_chlocx'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Change location X by");
    this.appendValueInput("object")
        .setCheck("String")
        .appendField("of object");
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("by");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_chlocx'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'bapi_gobj('+value_object+').position.x+='+value_value+';\n';
  return code;
};
//Change Y by
Blockly.Blocks['d_chlocy'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Change location Y by");
    this.appendValueInput("object")
        .setCheck("String")
        .appendField("of object");
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("by");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_chlocy'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'bapi_gobj('+value_object+').position.y+='+value_value+';\n';
  return code;
};
//Change Z by
Blockly.Blocks['d_chlocz'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Change location Z by");
    this.appendValueInput("object")
        .setCheck("String")
        .appendField("of object");
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("by");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_chlocz'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'bapi_gobj('+value_object+').position.z+='+value_value+';\n';
  return code;
};
//Change X by (rot)
Blockly.Blocks['d_chrotx'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Change rotation X by");
    this.appendValueInput("object")
        .setCheck("String")
        .appendField("of object");
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("by");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_chrotx'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'bapi_gobj('+value_object+').rotation.x+=rad*'+value_value+';\n';
  return code;
};
//Change Y by (rot)
Blockly.Blocks['d_chroty'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Change rotation Y by");
    this.appendValueInput("object")
        .setCheck("String")
        .appendField("of object");
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("by");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_chroty'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'bapi_gobj('+value_object+').rotation.y+=rad*'+value_value+';\n';
  return code;
};
//Change X by (rot)
Blockly.Blocks['d_chrotz'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Change rotation Z by");
    this.appendValueInput("object")
        .setCheck("String")
        .appendField("of object");
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("by");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_chrotz'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'bapi_gobj('+value_object+').rotation.z+=rad*'+value_value+';\n';
  return code;
};
//Get X loc
Blockly.Blocks['d_getlocx'] = {
  init: function() {
    this.appendValueInput("object")
        .setCheck("String")
        .appendField("get X location of object");
    this.setOutput(true, "Number");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_getlocx'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'bapi_gobj('+value_object+').position.x';
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Get Y loc
Blockly.Blocks['d_getlocy'] = {
  init: function() {
    this.appendValueInput("object")
        .setCheck("String")
        .appendField("get Y location of object");
    this.setOutput(true, "Number");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_getlocy'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'bapi_gobj('+value_object+').position.y';
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Get Z loc
Blockly.Blocks['d_getlocz'] = {
  init: function() {
    this.appendValueInput("object")
        .setCheck("String")
        .appendField("get Z location of object");
    this.setOutput(true, "Number");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_getlocz'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'bapi_gobj('+value_object+').position.z';
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Get X rot
Blockly.Blocks['d_getrotx'] = {
  init: function() {
    this.appendValueInput("object")
        .setCheck("String")
        .appendField("get X rotation of object");
    this.setOutput(true, "Number");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_getrotx'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'bapi_gobj('+value_object+').rotation.x*deg';
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Get Y rot
Blockly.Blocks['d_getroty'] = {
  init: function() {
    this.appendValueInput("object")
        .setCheck("String")
        .appendField("get Y rotation of object");
    this.setOutput(true, "Number");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_getroty'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'bapi_gobj('+value_object+').rotation.y*deg';
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Get Z rot
Blockly.Blocks['d_getrotz'] = {
  init: function() {
    this.appendValueInput("object")
        .setCheck("String")
        .appendField("get Z rotation of object");
    this.setOutput(true, "Number");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_getrotz'] = function(block) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'bapi_gobj('+value_object+').rotation.z*deg';
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Measure distance
Blockly.Blocks['misc_distance'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Distance between objects");
    this.appendValueInput("obj1")
        .setCheck("String")
        .appendField("Object 1");
    this.appendValueInput("obj2")
        .setCheck("String")
        .appendField("Object 2");
    this.setOutput(true, "Number");
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['misc_distance'] = function(block) {
  var value_obj1 = Blockly.JavaScript.valueToCode(block, 'obj1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_obj2 = Blockly.JavaScript.valueToCode(block, 'obj2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "bapi_distance("+value_obj1+","+value_obj2+")";
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//Run Javascript
Blockly.Blocks['misc_javascript'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Run Javascript code")
        .appendField(new Blockly.FieldTextInput(""), "code");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['misc_javascript'] = function(block) {
  return block.getFieldValue('code');
};
//Move forward
Blockly.Blocks['d_move_forward'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("Move forward steps");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_move_forward'] = function(block) {
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'bapi_forward(objid,'+value_value+');\n';
  return code;
};
//Move backwards
Blockly.Blocks['d_move_backwards'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("Move backwards steps");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_move_backwards'] = function(block) {
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'bapi_backwards(objid,'+value_value+');\n';
  return code;
};
//Turn right
Blockly.Blocks['d_move_turnright'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("Turn")
        .appendField(new Blockly.FieldImage(IMG_RIGHT, 15, 15, { alt: "right", flipRtl: "FALSE" }))
        .appendField("degrees");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_move_turnright'] = function(block) {
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'bapi_turn(0-(rad*'+value_value+'),objid);\n';
  return code;
};
//Turn right
Blockly.Blocks['d_move_turnleft'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("Turn")
        .appendField(new Blockly.FieldImage(IMG_LEFT, 15, 15, { alt: "left", flipRtl: "FALSE" }))
        .appendField("degrees");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_move_turnleft'] = function(block) {
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'bapi_turn((rad*'+value_value+'),objid);\n';
  return code;
};
//Key event
Blockly.Blocks['event_key'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("On key")
        .appendField(new Blockly.FieldTextInput("A"), "key")
        .appendField("pressed");
    this.appendStatementInput("blks")
        .setCheck(null);
    this.setColour(65);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['event_key'] = function(block) {
  var dropdown_key = block.getFieldValue('key');
  var statements_blks = Blockly.JavaScript.statementToCode(block,'blks');
  var code = 'if(bapi_keypressed("'+dropdown_key+'")){'+statements_blks+'}\n';
  return code;
};
//On start event
Blockly.Blocks['event_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("On game started");
    this.appendStatementInput("blks")
        .setCheck(null);
    this.setColour(65);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['event_start'] = function(block) {
  var statements_blks = Blockly.JavaScript.statementToCode(block,'blks');
  var code = 'if(this.firstRun){'+statements_blks+'}\n';
  return code;
};
//This object
Blockly.Blocks['d_thisobject'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("this object");
    this.setOutput(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_thisobject'] = function(block) {
  var code = 'getCurrentObject()';
  return [code, Blockly.JavaScript.ORDER_NONE];
};
//The camera
Blockly.Blocks['d_thecamera'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("the camera");
    this.setOutput(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['d_thecamera'] = function(block) {
  var code = 'getGameCamera()';
  return [code, Blockly.JavaScript.ORDER_NONE];
};
