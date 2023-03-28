export default class Environment{
    public PROP_URI: string = 'prod-server.com' as const
    public DEV_URI: string = 'http://localhost:3000'
    
    public PROP_SOCKET_URI: string = 'prod-server.com' as const
    public DEV_SOCKET_URI: string = 'http://localhost:3001'
}