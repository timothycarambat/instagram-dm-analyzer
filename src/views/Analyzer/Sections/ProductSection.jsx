import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import MoneyOff from "@material-ui/icons/MoneyOff";
import PieChart from "@material-ui/icons/PieChart";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class ProductSection extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Let's Talk Talking</h2>
            <h5 className={classes.description}>
              Upload the JSON output of your Instagram DM conversations and we
              will provide you some simple metrics and graphs that you can use
              for analytics and fun!
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Free"
                description="You can use this tool totally free. No cost to you at all!"
                icon={MoneyOff}
                iconColor="info"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Readable Results"
                description="Display the results to the conversations in a readable and understandable format!"
                icon={PieChart}
                iconColor="danger"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <InfoArea
                title="Secure"
                description="Your upload is safe here. We do not keep a copy of your file, we simply read it as you give it to us. Refresh the page and it's like it ever happened."
                icon={VerifiedUser}
                iconColor="success"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(ProductSection);
