import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

interface DetailFiles {
  uri: string;
  type?: string;
}

const DetailUpload: React.FC = () => {
  // Example name docs
  const docs: DetailFiles[] = [{ uri: "./Bayar.pdf" }];

  return (
    <div>
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        config={{
          header: {
            disableHeader: false,
            disableFileName: false,
            retainURLParams: false,
          },
        }}
        style={{ height: 1000 }}
      />
    </div>
  );
};

export default DetailUpload;
