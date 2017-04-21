<template>
    <div>
        <Row style="margin-top: 25px;">
            <Col span="16" offset="4">
                <Steps :current="0">
                    <Step title="preview" content="2017/4/21 basic concept"></Step>
                    <Step title="alpha" content="2017/4/30 secure & form check"></Step>
                    <Step title="beta" content="2017/5/20 network isolation & custom command"></Step>
                    <Step title="release" content="2017/7/20 more feature..."></Step>
                </Steps>
            </Col>
        </Row>
        <Row style="margin-top: 25px;">
            <Col span="16" offset="4">
                <Alert type="warning">This is a preview version for requirements collecting, do NOT try it in production envirment.</Alert>
                <Alert type="info">See our <a href="http://blog.theseus.online" target="view_window">blog</a> for more information.</Alert>
            </Col>
        </Row>
    </div>
</template>
