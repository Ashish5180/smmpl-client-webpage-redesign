/**
 * Client logos configuration shaped to mirror future Sanity CMS schema.
 * TODO(client): Replace placeholder entries with verified client names and logo images.
 */

export interface ClientLogo {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface ClientItem {
  _id: string;
  name: string;
  isPlaceholder: boolean;
  logo?: ClientLogo;
}

// TODO(client): Replace placeholder client partners with verified client names and SVG/PNG logos
export const CLIENT_ROW_ONE: ClientItem[] = [
  { _id: "client-01", name: "Client Partner 01", isPlaceholder: true },
  { _id: "client-02", name: "Client Partner 02", isPlaceholder: true },
  { _id: "client-03", name: "Client Partner 03", isPlaceholder: true },
  { _id: "client-04", name: "Client Partner 04", isPlaceholder: true },
  { _id: "client-05", name: "Client Partner 05", isPlaceholder: true },
  { _id: "client-06", name: "Client Partner 06", isPlaceholder: true },
];

// TODO(client): Replace placeholder client partners with verified client names and SVG/PNG logos
export const CLIENT_ROW_TWO: ClientItem[] = [
  { _id: "client-07", name: "Client Partner 07", isPlaceholder: true },
  { _id: "client-08", name: "Client Partner 08", isPlaceholder: true },
  { _id: "client-09", name: "Client Partner 09", isPlaceholder: true },
  { _id: "client-10", name: "Client Partner 10", isPlaceholder: true },
  { _id: "client-11", name: "Client Partner 11", isPlaceholder: true },
  { _id: "client-12", name: "Client Partner 12", isPlaceholder: true },
];
