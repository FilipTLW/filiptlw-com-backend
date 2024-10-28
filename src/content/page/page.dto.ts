type PageSection = {
  title: string;
  content: string;
}

export type PageCreateDTO = {
  title: string;
  subtitle: string;
  header?: string;
  footer?: string;
  sections: PageSection[];
}