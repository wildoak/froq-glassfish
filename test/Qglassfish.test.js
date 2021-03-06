import {promisify, callbackify} from 'util';
import {test} from 'ava';
import {create as mavenCreate} from 'maven';
import {Docker} from 'froq-docker';
import parallel_ from 'run-parallel';

import {Glassfish} from '../src';


const parallel = promisify(parallel_);

const payaraDockerName = 'payara/server-full:latest';
const mvnProjectRoot = `${__dirname}/assets/helloworld`;
const targetPath = `${mvnProjectRoot}/target`;
const finalName = 'war-file';
const warFileName = `${finalName}.war`;
const targetFile = `${targetPath}/${warFileName}`;


test('should deploy', async t => {
    const docker = Docker.fromSocket();
    const mvn = mavenCreate({cwd: mvnProjectRoot});

    const [[container, glassfish]] = await parallel([
        callbackify(async () => {
            const image = await docker.pull({fromImage: payaraDockerName});
            const cont = await image.createContainer({
                data: {
                    HostConfig: {
                        PortBindings: {
                            '4848/tcp': [
                                {HostPort: ''}
                            ],
                            '8080/tcp': [
                                {HostPort: ''}
                            ]
                        }
                    }
                }
            });

            await cont.start();
            const inspection = await cont.inspect();
            const gf = new Glassfish(`https://${inspection.getFirstHostAddress('4848/tcp')}`, 'admin', 'admin');

            return [cont, gf];
        }),
        callbackify(() => mvn.execute(['clean', 'package', `-Dfinal-name=${finalName}`]))
    ]);

    await glassfish.deploy(targetFile);

    await container.stop();
    await container.remove();

    t.pass();
});
