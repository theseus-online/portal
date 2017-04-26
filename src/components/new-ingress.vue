<template>
    <Row>
        <Col span="16" offset="4">
            <Form :model="newbee" :label-width="80">
                <Form-item label="Name">
                    <Input v-model="newbee.name" placeholder="Ingress Name"></Input>
                </Form-item>
                <Form-item label="Domain">
                    <Input v-model="newbee.host" placeholder="Your Site Domain"></Input>
                </Form-item>
                <Form-item label="Secure">
                    <i-switch v-model="newbee.secure">
                        <span slot="open">tls</span>
                        <span slot="close">tcp</span>
                    </i-switch>
                </Form-item>
                <Form-item label="Backend">
                    <Row type="flex" justify="space-between">
                        <Col span="11">
                            <Select v-model="newbee.serviceName" placeholder="Chose Service">
                                <Option v-for="s in services" :key="s.name" :value="s.name">{{s.name}}</Option>
                            </Select>
                        </Col>
                        <Col span="11">
                            <Select v-model="newbee.servicePort" placeholder="Chose Service Port">
                                <Option v-for="p in ports" :key="p.name" :value="p.port" :label="p.name + '(' + p.port + ')'">
                                    <span class="fixed-text-span">{{p.name}}</span>
                                    <span style="float:right;color:#ccc;">{{p.port}}</span>
                                </Option>
                            </Select>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item>
                    <Tooltip content="Commit this ingress" placement="bottom">
                        <Button type="ghost" @click="deploy">Deploy</Button>
                    </Tooltip>
                    <Tooltip content="Cancel and go back" placement="bottom">
                        <Button type="ghost" @click="cancel">Cancel</Button>
                    </Tooltip>
                </Form-item>
            </Form>
        </Col>
    </Row>
</template>

<script>
    import uuid from 'uuid/v4';

    export default {
        data: function() {
            return {
                newbee: {           // New deployment
                    name: 'ingress-' + uuid(),
                    owner: this.$route.params.username,
                    host: null,
                    secure: false,
                    serviceName: '',
                    servicePort: ''
                },
                services: []
            }
        },
        mounted: function() {
            this.$http.get('users/' + this.$route.params.username + '/services').then(response => {
                this.services = response.data;
            }, response => {
                this.$Message.error('Load services failed!');
            });
        },
        computed: {
            ports() {
                if(this.newbee.serviceName) {
                    for(const s of this.services) {
                        if(s.name == this.newbee.serviceName) {
                            return s.ports.filter(p => {
                                return p.protocol == "TCP";
                            });
                        }
                    }
                }
                return [];
            }
        },
        methods: {
            deploy() {
                this.$http.post('users/' + this.$route.params.username + '/ingresses', this.newbee).then(response => {
                    this.$Message.success('Deploy success!');
                    this.$router.push({ name: "ingress" });
                }, response => {
                    this.$Message.error('Deploy failed!');
                });
            },
            cancel() {
                this.$router.push({ name: "ingress" });
            }
        }
    }
</script>

<style scoped>
    .fixed-text-span {
        display: inline-block;
        width: 85%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
