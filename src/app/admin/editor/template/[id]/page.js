import TemplateEditorClient from './TemplateEditorClient';

export default async function TemplateEditorPage({ params }) {
  const resolvedParams = await params;
  
  return <TemplateEditorClient templateId={resolvedParams.id} />;
}
