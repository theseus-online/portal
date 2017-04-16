<template>
    <Row>
        <Col span="16" offset="4">
            <Collapse v-if="volumes" accordion>
                <Panel v-for="v in volumes" :key="v.name">
                    {{v.name}}
                    <div slot="content">
                        <Alert type="warning">
                            <Button type="ghost" shape="circle" style="color: #ff3300;" @click="deleteVolume(v)">
                                Delete This Volume
                            </Button>
                        </Alert>
                    </div>
                </Panel>
            </Collapse>
            <Spin size="large" fix v-else></Spin>
        </Col>
        <Col span="4">
            <Affix :offset-top="80">
                <Button v-if="volumes" @click="createVolume" type="ghost" shape="circle" style="color: #00cc66; float: right;">
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
                volumes: null,
            }
        },
        mounted: function() {
            this.loadVolumes();
        },
        methods: {
            loadVolumes() {
                this.volumes = null;
                this.$http.get('users/' + this.$route.params.username + '/volumes').then(response => {
                    this.volumes = response.data;
                }, response => {
                    this.$Message.error('Load volumes failed!');
                });
            },
            createVolume() {
                this.$router.push({ name: "new-volume" });
            },
            deleteVolume(v) {
                this.$router.push({ name: "del-volume", params: { vname: v.name }});
            }
        }
    }
</script>
