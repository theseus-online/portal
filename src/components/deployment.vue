<template>
    <Row>
        <Col span="16" offset="4">
            <Collapse v-if="deployments" accordion>
                <Panel v-for="dep in deployments" :key="dep.name">
                    {{dep.name}}
                    <div slot="content">
                        <Alert>This app contains {{dep.containers.length}} containers:</Alert>
                        <Collapse accordion>
                            <Panel v-for="c in dep.containers" :key="c.name">
                                {{c.name}}
                                <Alert type="warning" slot="content">{{c.image}}</Alert>
                            </Panel>
                        </Collapse>
                        <Alert type="warning">
                            <Button type="ghost" shape="circle" style="color: #ff3300;" @click="deleteDeployment(dep)">
                                Delete This App
                            </Button>
                        </Alert>
                    </div>
                </Panel>
            </Collapse>
            <Spin size="large" fix v-else></Spin>
        </Col>
        <Col span="4">
            <Affix :offset-top="80">
                <Button v-if="deployments" @click="createDeployment" type="ghost" shape="circle" style="color: #00cc66; float: right;">
                    <Icon type="plus-round"></Icon>
                </Button>
            </Affix>
        </Col>
    </Row>
</template>

<script>
    export default {
        data: function() {
            return {
                deployments: null,
            }
        },
        mounted: function() {
            this.loadDeployments();
        },
        methods: {
            loadDeployments() {
                this.deployments = null;
                this.$http.get('users/' + this.$route.params.username + '/deployments').then(response => {
                    this.deployments = response.data;
                }, response => {
                    this.$Message.error('Load deployments failed!');
                });
            },
            createDeployment() {
                this.$router.push({ name: "new-deployment" });
            },
            deleteDeployment(d) {
                this.$router.push({ name: "del-deployment", params: { depname: d.name }});
            }
        }
    }
</script>
