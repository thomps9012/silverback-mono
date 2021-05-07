<?php

namespace Drupal\Tests\silverback_gatsby\Kernel;

use Drupal\node\Entity\Node;

class EntityFeedTest extends EntityFeedTestBase {

  public function testUntranslatableEntity() {
    $node = Node::create([
      'type' => 'blog',
      'title' => 'Test'
    ]);
    $node->save();

    $query = $this->getQueryFromFile('untranslatable.gql');
    $metadata = $this->defaultCacheMetaData();
    $metadata->addCacheContexts(['user.node_grants:view']);
    $metadata->addCacheTags(['node:1', 'node_list']);
    $this->assertResults($query, [], [
      'queryPosts' => [
        [
          'id' => '1',
          'title' => 'Test',
        ],
      ],
    ], $metadata);
  }

  public function testTranslatableEntity() {
    $node = Node::create([
      'type' => 'page',
      'title' => 'Test'
    ]);
    $node->save();

    $query = $this->getQueryFromFile('translatable.gql');
    $metadata = $this->defaultCacheMetaData();
    $metadata->addCacheContexts(['user.node_grants:view', 'static:language:en']);
    $metadata->addCacheTags(['node:1', 'node_list']);
    $this->assertResults($query, [], [
      'queryPages' => [
        [
          'id' => '1',
          'translations' => [
            [
              'langcode' => 'en',
              'title' => 'Test',
            ],
          ],
        ],
      ],
    ], $metadata);
  }
}