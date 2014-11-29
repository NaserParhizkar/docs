
# Request API

The Request API allow you to make easily API calls to the OAuth provider your user is authorized to. You can perform classic HTTP calls using GET, POST, PUT, DELETE, PATCH

## GET

Allows you to perform `GET` request to an API endpoint

Argument|Description|Type|Example value
--------|-----------|----|-------------
url|The URL of the endpoint, it can be an absolute URL or just the endpoint (after the domain) as for most provider, we already know the domain.|string|/api/endpoint

## POST

Allows you to perform `POST` request to an API endpoint

Argument|Description|Type|Example value
--------|-----------|----|-------------
url|The URL of the endpoint, it can be an absolute URL or just the endpoint (after the domain) as for most provider, we already know the domain.|string|/api/endpoint
params|A jQuery type object for an ajax request, which can contain the data, to send POST params.|Object|{data:{field:'value'}}

## PUT

Allows you to perform `PUT` request to an API endpoint

Argument|Description|Type|Example value
--------|-----------|----|-------------
url|The URL of the endpoint, it can be an absolute URL or just the endpoint (after the domain) as for most provider, we already know the domain.|string|/api/endpoint
params|A jQuery type object for an ajax request, which can contain the data, to send POST params.|Object|{data:{field:'value'}}

## DELETE

Allows you to perform `DELETE` request to an API endpoint

Argument|Description|Type|Example value
--------|-----------|----|-------------
url|The URL of the endpoint, it can be an absolute URL or just the endpoint (after the domain) as for most provider, we already know the domain.|string|/api/endpoint

## PATCH

Allows you to perform `PATCH` request to an API endpoint

Argument|Description|Type|Example value
--------|-----------|----|-------------
url|The URL of the endpoint, it can be an absolute URL or just the endpoint (after the domain) as for most provider, we already know the domain.|string|/api/endpoint
params|A jQuery type object for an ajax request, which can contain the data, to send POST params.|Object|{data:{field:'value'}}
