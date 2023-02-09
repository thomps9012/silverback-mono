<?php

namespace Drupal\graphql_directives\Plugin\GraphQL\Directive;

use Drupal\Core\Plugin\PluginBase;
use Drupal\graphql\GraphQL\ResolverBuilder;
use Drupal\graphql_directives\DirectiveInterface;
use Drupal\graphql\GraphQL\Resolver\ResolverInterface;

/**
 * @Directive(
 *   id = "resolveMenuItemId"
 * )
 */
class MenuItemId extends PluginBase implements DirectiveInterface {

  public function buildResolver(ResolverBuilder $builder, $arguments): ResolverInterface {
    return $builder->produce('menu_item_id')
      ->map('item', $builder->fromParent());
  }

}