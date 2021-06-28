import styles from "./HtmlContent.module.scss";

interface HtmlContentProps {
  content: string;
}

const HtmlContent = (props: HtmlContentProps) => {
  const { content } = props;

  return (
    <div
      className={styles.content}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default HtmlContent;
