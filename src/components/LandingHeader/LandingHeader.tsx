import React from 'react';
import { Box, Button, Text } from '@binarycapsule/ui-capsules';

export const LandingHeader: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" py="48">
      <Text
        fontWeight={600}
        color="blue.600"
        style={{
          fontFamily: 'Lenox, sans-serif',
          textTransform: 'uppercase',
          fontSize: '50px',
          lineHeight: '50px',
        }}
      >
        BC Editor
      </Text>

      <Text fontSize="small" color="neutral.500">
        Rich text editor powered by Prosemirror
      </Text>

      <Box display="flex">
        <Text fontSize="small" color="neutral.500" mr="4">
          by
        </Text>

        <Text
          color="neutral.500"
          style={{
            fontFamily: 'Lenox, sans-serif',
          }}
        >
          BinaryCapsule
        </Text>
      </Box>

      <Button
        as="a"
        // @ts-ignore
        href="https://github.com/jcmnunes/editor"
        leftIcon="github"
        variant="outline"
        variantColor="neutral"
        iconVariant="outline"
        mt="24"
      >
        GitHub
      </Button>
    </Box>
  );
};
