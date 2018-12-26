import React from "react";
import { Header as SemanticHeader } from "semantic-ui-react";
import { string, node } from "prop-types";
import cn from "classnames";
import styles from "./styles.module.scss";

const commonPropTypes = {
  children: node,
  className: string,
};

const commonDefaultProps = {
  children: null,
  className: "",
};

function Card({ className, children }) {
  return <div className={cn(className, styles.card)}>{children}</div>;
}

function Header({ className, children }) {
  return (
    <SemanticHeader as="h3" className={cn(className, styles.header)}>
      {children}
    </SemanticHeader>
  );
}

function Image({ src, className }) {
  return <img className={cn(className, styles.image)} src={src} alt="" />;
}

function Content({ className, children }) {
  return <div className={cn(className, styles.content)}>{children}</div>;
}

Card.Header = Header;
Card.Image = Image;
Card.Content = Content;

Card.propTypes = commonPropTypes;
Card.defaultProps = commonDefaultProps;

Header.propTypes = commonPropTypes;
Header.defaultProps = commonDefaultProps;

Image.propTypes = {
  src: string.isRequired,
  className: string,
};

Image.defaultProps = {
  className: "",
};

Content.propTypes = commonPropTypes;
Content.defaultProps = commonDefaultProps;

export default Card;
