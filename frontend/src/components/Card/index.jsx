/* eslint-disable 
  jsx-a11y/click-events-have-key-events,
  jsx-a11y/no-noninteractive-element-interactions 
*/
import React from "react";
import { string, node, func } from "prop-types";
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
  return <h3 className={cn(className, styles.header)}>{children}</h3>;
}

function Image({ src, className, onOpenImage }) {
  return (
    <div className={styles.imageWrapper}>
      <img
        className={cn(className, styles.image)}
        src={src}
        alt=""
        onClick={onOpenImage}
      />
    </div>
  );
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
  onOpenImage: func,
};

Image.defaultProps = {
  className: "",
  onOpenImage: () => {},
};

Content.propTypes = commonPropTypes;
Content.defaultProps = commonDefaultProps;

export default Card;
