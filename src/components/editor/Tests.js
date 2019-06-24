import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/ext/language_tools';
import 'brace/mode/java';
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/tomorrow';
import 'brace/theme/kuroir';
import 'brace/theme/twilight';
import 'brace/theme/xcode';
import 'brace/theme/textmate';
import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light';
import 'brace/theme/terminal';

const Tests = ({ tests, theme }) => {

  return (
    <AceEditor
      placeholder="GO !!"
      mode="javascript"
      theme={theme}
      name="blah3"
      value={tests}
      fontSize={16}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      readOnly={true}
      style={{
        margin: "10px 0",
        width: "unset",
        height: "150px"
      }}
    />

  );
}
export default Tests

