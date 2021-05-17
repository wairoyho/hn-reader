import styled from "@emotion/styled";

interface HtmlContentProps {
  content: string;
}

const Content = styled.div`
  word-break: break-word;
  & > pre {
    white-space: pre-wrap;
    background-color: #e3e3e3;
  }
`;

const HtmlContent = (props: HtmlContentProps) => {
  const { content } = props;

  return <Content dangerouslySetInnerHTML={{ __html: content }} />;
};

export default HtmlContent;
