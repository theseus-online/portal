<template>
    <Row>
        <Col span="16" offset="4">
            <Form :model="newbee" :label-width="80">
                <Form-item label="Service">
                    <Row type="flex" justify="space-between">
                        <Col span="11"><Input v-model="newbee.name" placeholder="Service Name"></Input></Col>
                        <Col span="11">
                            <Select v-model="newbee.backend" placeholder="Chose Backend App">
                                <Option v-for="d in deployments" :key="d.name" :value="d.name">{{d.name}}</Option>
                            </Select>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item v-for="(p, i) in newbee.ports" :key="i" :label="'Port' + (i + 1)">
                    <Row type="flex" justify="space-between">
                        <Col span="3"><Input v-model="p.name" placeholder="Port Name"></Input></Col>
                        <Col span="5">
                            <Select v-model="p.protocol" placeholder="Chose Protocol">
                                <Option value="TCP">TCP</Option>
                                <Option value="UDP">UDP</Option>
                            </Select>
                        </Col>
                        <Col span="2" style="text-align: right">srcPort:</Col>
                        <Col span="4"><Input-number :max="65535" :min="1" v-model="p.port"></Input-number></Col>
                        <Col span="2" style="text-align: right">dstPort:</Col>
                        <Col span="4"><Input-number :max="65535" :min="1" v-model="p.targetPort"></Input-number></Col>
                        <Col span="3">
                            <Tooltip content="Remove this port" placement="bottom" style="float: right;" v-show="canRemovePort">
                                <Button type="ghost" style="color: #ff3300;" @click="removePort(i)">
                                    <Icon type="minus-round"></Icon>
                                </Button>
                            </Tooltip>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item>
                    <Tooltip content="Add more port" placement="bottom">
                        <Button type="ghost" style="color: #00cc66;" @click="addPort">
                            <Icon type="plus-round"></Icon>
                        </Button>
                    </Tooltip>
                </Form-item>
                <Form-item>
                    <Tooltip content="Commit this service" placement="bottom">
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
    export default {
        data: function() {
            return {
                newbee: {           // New deployment
                    name: '',
                    owner: this.$route.params.username,
                    backend: '',
                    ports: [
                        {
                            name: '',
                            protocol: '',
                            port: null,
                            targetPort: null
                        }
                    ]
                },
                deployments: []
            }
        },
        mounted: function() {
            this.$http.get('users/' + this.$route.params.username + '/deployments').then(response => {
                this.deployments = response.data;
            }, response => {
                this.$Message.error('Load deployments failed!');
            });
        },
        computed: {
            canRemovePort: function() {
                return this.newbee.ports.length > 1;
            }
        },
        methods: {
            addPort() {
                this.newbee.ports.push({
                    name: null,
                    protocol: null,
                    port: null,
                    targetPort: null
                });
            },
            removePort(i) {
                this.newbee.ports.splice(i, 1);
            },
            deploy() {
                this.$http.post('users/' + this.$route.params.username + '/services', this.newbee).then(response => {
                    this.$Message.success('Deploy success!');
                    this.$router.push({ name: "service" });
                }, response => {
                    this.$Message.error('Deploy failed!');
                });
            },
            cancel() {
                this.$router.push({ name: "service" });
            }
        }
    }
</script>
