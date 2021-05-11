# Notes for updating graph traversal control parameter names

I'm proposing the following name changes:

```
- objectPrefixWhitelist    -> expandObjectPrefix
- objectUriWhitelist       -> expandObjectUri
- objectTypeWhitelist      -> expandObjectType
- objectPrefixBlacklist    -> ignoreObjectPrefix
- objectUriBlacklist       -> ignoreObjectUri
- objectTypeBlacklist      -> ignoreObjectType
- propertyPrefixWhitelist  -> followPropertyPrefix
- propertyUriWhitelist     -> followPropertyUri
- propertyPrefixBlacklist  -> ignorePpropertyPrefix
- propertyUriBlacklist     -> ignorePropertyUri 
```

As far as can tell, the only `meld-clients-core` references to any of these are in `meld-clients-core/src/actions/index.js`

sed commands (sed.txt):


s/objectPrefixWhitelist/expandObjectPrefix/g
s/objectUriWhitelist/expandObjectUri/g
s/objectTypeWhitelist/expandObjectType/g
s/objectPrefixBlacklist/ignoreObjectPrefix/g
s/objectUriBlacklist/ignoreObjectUri/g
s/objectTypeBlacklist/ignoreObjectType/g
s/propertyPrefixWhitelist/followPropertyPrefix/g
s/propertyUriWhitelist/followPropertyUri/g
s/propertyPrefixBlacklist/ignorePpropertyPrefix/g
s/propertyUriBlacklist/ignorePropertyUri/g

