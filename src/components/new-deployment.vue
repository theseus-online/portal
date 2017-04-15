<template>
    <Row>
        <Col span="16" offset="4">
            <Form :model="newbee" :label-width="80">
                <Form-item label="App">
                    <Input v-model="newbee.name" placeholder="App Name"></Input>
                </Form-item>
                <Form-item v-for="(c, i) in newbee.containers" :key="i" label="Image">
                    <Row type="flex" justify="space-between">
                        <Col span="10"><Input v-model="c.name" placeholder="Image Name"></Input></Col>
                        <Col span="10"><Input v-model="c.image" placeholder="Image Address"></Input></Col>
                        <Col span="3" v-show="canRemoveContainer">
                            <Tooltip content="Remove this image" placement="bottom" style="float: right;">
                                <Button type="ghost" style="color: #ff3300;" @click="removeContainer(i)">
                                    <Icon type="minus-round"></Icon>
                                </Button>
                            </Tooltip>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item>
                    <Tooltip content="Add more image" placement="bottom">
                        <Button type="ghost" style="color: #00cc66;" @click="addContainer">
                            <Icon type="plus-round"></Icon>
                        </Button>
                    </Tooltip>
                </Form-item>
                <Form-item>
                    <Tooltip content="Commit this deployment" placement="bottom">
                        <Button type="ghost" @click="deploy">Deploy</Button>
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
                    name: null,
                    owner: this.$route.params.username,
                    containers: [
                        {
                            name: null,
                            image: null,
                        }
                    ]
                }
            }
        },
        computed: {
            canRemoveContainer: function() {
                return this.newbee.containers.length > 1;
            }
        },
        methods: {
            addContainer() {
                this.newbee.containers.push({
                    name: null,
                    image: null,
                });
            },
            removeContainer(i) {
                this.newbee.containers.splice(i, 1);
            },
            deploy() {
                this.$http.post('users/' + this.$route.params.username + '/deployments', this.newbee).then(response => {
                    this.$Message.success('Deploy success!');
                    this.$router.push({ name: "deployment" });
                }, response => {
                    this.$Message.error('Deploy failed!');
                });
            },
            cancel() {
                this.$router.push({ name: "deployment" });
            }
        }
    }
</script>
