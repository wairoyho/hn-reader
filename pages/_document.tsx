import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html style={{ overflowY: "scroll", overscrollBehaviorY: "none" }}>
        <Head />
        <body className="bg-yellow-50 font-sans">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
