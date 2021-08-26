import { PeerConnection } from 'peer-connection';

/**
 * Wait until the given peer connection has finished gathering ICE candidates and, when it has,
 * return the local description with the candidates.
 *
 * @param peerConnection - The PeerConnection to use.
 * @returns A Promise that resolves with the local description with the ICE candidates in it.
 */
export function getLocalDescriptionWithIceCandidates(
  peerConnection: PeerConnection
): Promise<RTCSessionDescription> {
  return new Promise((resolve, reject) => {
    peerConnection.on(PeerConnection.Events.IceGatheringStateChange, (e) => {
      if (e.target.iceGatheringState === 'complete') {
        const localDesc = peerConnection.getLocalDescription();
        if (localDesc) {
          resolve(localDesc);
        } else {
          reject(new Error('Local description was null'));
        }
      }
      // TODO(brian): throw an error if we see an error iceGatheringState
    });
  });
}
