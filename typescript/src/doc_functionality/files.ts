type File = {
  entityId: string;
  entityMeta: {
    title: string;
    description: string;
  };
};

type RemoteFile = {
  fileId: string;
  referencePersistentId: string;
  name: string;
  checksum: string;
  url: string;
  size: number;
};

export const getFileFromFiles = (files: RemoteFile[], fileId: string) => {
  return files.find(file => file.referencePersistentId === fileId);
};

export const convertFileToShortcut = (
  file: File,
  fileName: string,
  previewUrl: string
) => {
  return {
    title: file.entityMeta.title || fileName,
    description: file.entityMeta.description,
    previewUrl
  };
};

export const getIconUrlFromFileType = (type?: string) => {
  switch (type?.toLowerCase()) {
    case 'png':
      return 'icons/file-type-png.svg';
    case 'svg':
      return 'icons/file-type-svg.svg';
    case 'jpg':
    case 'jpeg':
      return 'icons/file-type-jpg.svg';
    case 'gif':
      return 'icons/file-type-gif.svg';
    case 'mp4':
      return 'icons/file-type-mp4.svg';
    case 'jam':
    case 'fig':
      return 'icons/file-type-figma.svg';
    case 'psd':
      return 'icons/file-type-psd.svg';
    case 'ai':
      return 'icons/file-type-ai.svg';
    case 'sketch':
      return 'icons/file-type-sketch.svg';
    case 'pdf':
      return 'icons/file-type-pdf.svg';
    case 'zip':
    case 'rar':
    case '7z':
    case 'tar':
    case 'gz':
    case 'bz2':
    case 'xz':
      return 'icons/file-type-archive.svg';
    case 'doc':
    case 'docx':
      return 'icons/file-type-docx.svg';
    case 'ppt':
    case 'pptx':
      return 'icons/file-type-pptx.svg';
    case 'ttf':
    case 'otf':
      return 'icons/file-type-font-pack.svg';
    case 'json':
      return 'icons/file-type-json.svg';
    case 'js':
      return 'icons/file-type-js.svg';
    case 'css':
      return 'icons/file-type-css.svg';
    case 'scss':
      return 'icons/file-type-scss.svg';
    case 'ts':
      return 'icons/file-type-ts.svg';
    case 'tsx':
      return 'icons/file-type-tsx.svg';
    case 'html':
      return 'icons/file-type-html.svg';
    case 'mdx':
    case 'md':
      return 'icons/file-type-markdown.svg';
    case 'csv':
    case 'txt':
    case 'log':
    case 'xml':
    case 'yaml':
    case 'yml':
    case 'ini':
    case 'conf':
    case 'cfg':
    case 'php':
    case 'py':
    case 'rb':
    case 'sh':
    case 'bat':
    case 'cmd':
    case 'ps1':
    case 'c':
    case 'cpp':
    case 'h':
    case 'cs':
    case 'java':
    case 'swift':
    case 'go':
      return 'icons/file-type-generic-code.svg';
    default:
      return 'icons/file-type-generic.svg';
  }
};

export const getFileTypeFromFileName = (fileName: string) => {
  return fileName.split('.').pop();
};

export const getFilesVariantClass = (
  variant: string,
  numberOfColumns: number
) => {
  switch (variant) {
    case 'iconOnTop':
      return `variant-icon-top-${numberOfColumns}`;
    case 'iconOnLeft':
      return `variant-icon-leading-${numberOfColumns}`;
    default:
      return '';
  }
};
