import { createRealmContext } from '@realm/react';
import { Historic } from './schemas/Historic';

export const syncConfig: any = {
  flexible: true
  // newRealmFileBehavior: {
  //   type: Realm.OpenRealmBehaviorType.OpenImmediately
  // },
  // existingRealmFileBehavior: {
  //   type: Realm.OpenRealmBehaviorType.OpenImmediately
  // }
};

export const { RealmProvider, useRealm, useQuery, useObject } = createRealmContext({
  schema: [Historic]
});
