import React from "react";
import ReactFileReader from "react-file-reader";
import Button from "components/CustomButtons/Button.jsx";

import teamStyle from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";

class UploadSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sendToParent: this.props.sendToParent,
    };
  }

  render() {
    var fileReader;
    const { classes } = this.props;

    const handleFileUpload = file => {
      fileReader = new FileReader();
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(file);
    };

    const handleFileRead = () => {
      const content = JSON.parse(fileReader.result);
      this.props.sendToParent(content)
    };

    return (
      <div className={classes.section} style={{paddingBottom: "20px"}}>
        <h2 className={classes.title}>Upload your JSON File Here</h2>
        <ReactFileReader
          fileTypes={[".json"]}
          base64={true}
          multipleFiles={true}
          handleFiles={e => handleFileUpload(e.fileList[0])}
        >
          <Button color="info">Upload</Button>
        </ReactFileReader>
      </div>
    );
  }
}

export default withStyles(teamStyle)(UploadSection);
