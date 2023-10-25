<?php

use Drupal\user\RoleInterface;

/**
 * Set up the Publisher OAuth Consumer.
 */
function silverback_gatsby_oauth_deploy_set_consumers(array &$sandbox): string {
  // Skip for Silverback environments.
  // It might be used for OAuth development purpose only in Silverback
  // and can be set manually for this case.
  // Matches the default Publisher behavior
  // that disables Publisher OAuth for non Lagoon environments.
  if (getenv('SB_ENVIRONMENT')) {
    return t('Skipping for Silverback environment.');
  }

  // Check requirements.
  $entityTypeManager = \Drupal::entityTypeManager();
  $publisherRole = $entityTypeManager->getStorage('user_role')->load('publisher');
  if (!$publisherRole instanceof RoleInterface) {
    throw new \Exception('Publisher Role does not exist. It is required to setup the Publisher OAuth Consumer.');
  }

  $publisherUrl = getenv('PUBLISHER_URL');
  if (!$publisherUrl) {
    throw new \Exception('PUBLISHER_URL environment variable is not set. It is required to setup the Publisher OAuth Consumer.');
  }

  $clientSecret = getenv('PUBLISHER_OAUTH2_CLIENT_SECRET');
  if (!$clientSecret) {
    throw new \Exception('PUBLISHER_OAUTH2_CLIENT_SECRET environment variable is not set. It is required to setup the Publisher OAuth Consumer.');
  }

  $consumersStorage = $entityTypeManager->getStorage('consumer');
  $existingConsumers = $consumersStorage->loadMultiple();
  $hasPublisherConsumer = FALSE;
  /** @var \Drupal\consumers\Entity\ConsumerInterface $consumer */
  foreach($existingConsumers as $consumer) {
    // As a side effect, delete the default consumer.
    // It is installed by the Consumers module.
    if ($consumer->getClientId() === 'default_consumer') {
      $consumer->delete();
    }
    if ($consumer->getClientId() === 'publisher') {
      $hasPublisherConsumer = TRUE;
    }
  }

  // Create the Publisher Consumer if it does not exist.
  if (!$hasPublisherConsumer) {
    $oAuthCallback = $publisherUrl . '/oauth/callback';
    $consumersStorage->create([
      'label' => 'Publisher',
      'client_id' => 'publisher',
      'is_default' => TRUE,
      'secret' => $clientSecret,
      'redirect' => $oAuthCallback,
      'roles' => [
        'publisher',
      ],
    ])->save();
    return t('Created Publisher OAuth Consumer.');
  }

  return t('Publisher OAuth Consumer already exists.');
}