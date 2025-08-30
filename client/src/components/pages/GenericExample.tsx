import {
  Body1,
  Text,
  Title1
} from '@fluentui/react-components';
import React from 'react';

// Generic content component for other sections
const GenericContent: React.FC<{ title: string; description: string; sectionId: string }> = ({
  title,
  description,
  sectionId
}) => {
  return (
    <div>
      <Title1>{title}</Title1>
      <Body1>{description}</Body1>
      <Text>Section ID: {sectionId}</Text>
      <Text>This section is ready for your custom content implementation.</Text>
    </div>
  );
};

export default GenericContent;